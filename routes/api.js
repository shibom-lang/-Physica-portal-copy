const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs'); //  SECURITY TOOL
const jwt = require('jsonwebtoken'); // 🔒 JWT for token generation & verification
const authMiddleware = require('../middleware/auth'); // 🔒 Auth guard for protected routes
const { User, Resource, Blog, Notice, ResearchPost, EventHighlight, EventPost, Achievement, Carousel } = require('../models/schemas');
// --- 1. FILE UPLOAD SETUP (Cloudinary) ---
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create the storage engine for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'physica_uploads',
      resource_type: 'auto' 
    }
  });
const upload = multer({ storage: storage });


// --- SECURE LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // 1. Find the user in the database
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Invalid Username or Password" });

        // 2. THE BOUNCER: Stop Pending Students
        if (user.role === 'student' && user.status === 'pending') {
            return res.status(403).json({ message: "Access Denied: Your account is waiting for Teacher Approval." });
        }

        // 3. Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Username or Password" });

        // 🔒 Generate JWT token (expires in 7 days)
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // ✅ Login Success — return user data + token
        res.status(200).json({
            _id: user._id,
            username: user.username,
            name: user.name,
            role: user.role,
            semester: user.semester,
            status: user.status,
            profilePicture: user.profilePicture,
            designation: user.designation,
            qualifications: user.qualifications,
            bio: user.bio,
            attendance: user.attendance,
            token // 🔑 Send token to frontend
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
});

// --- 3.  SECURE REGISTRATION ROUTE ---
// 1. UPDATED REGISTRATION ROUTE ---
router.post('/register', async (req, res) => {
    try {
        const { password, role, name, designation, semester, rollNumber, adminCode } = req.body;

        let status = 'pending'; 
        let finalUsername = req.body.username; 
        
        // Convert role to lowercase to match logic exactly
        const lowerRole = role.toLowerCase();

        if (lowerRole === 'teacher') {
            if (adminCode !== process.env.TEACHER_SECRET_CODE) return res.status(403).json({ message: "Invalid Teacher Code" });
            status = 'approved'; 
        }
        else if (lowerRole === 'student') {
            if (!rollNumber || rollNumber.length !== 12) {
                return res.status(400).json({ message: "Roll Number must be 12 digits." });
            }
            const cleanName = name.replace(/\s+/g, '').toLowerCase();
            const last4 = rollNumber.slice(-4);
            finalUsername = `${cleanName}_${last4}`;
            // status remains 'pending'
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: finalUsername,
            password: hashedPassword,
            role: lowerRole,
            status, // This explicitly saves 'pending' to the DB for students
            name,
            rollNumber,
            designation,
            semester,
            attendance: { jan: { attended: 0, total: 0 }, feb: { attended: 0, total: 0 } }
        });

        await newUser.save();
        res.status(201).json({ message: "Account Created", generatedUsername: finalUsername, status });
    } catch (err) {
        res.status(500).json({ message: "Server Error or Duplicate Roll Number" });
    }
});
// Get all pending students for the Teacher Dashboard
router.get('/students/pending', async (req, res) => {
    try {
        // Find all users who are students AND are still pending
        const pendingStudents = await User.find({ role: 'student', status: 'pending' }).select('-password');
        res.status(200).json(pendingStudents);
    } catch (err) {
        console.error("Error fetching pending students:", err);
        res.status(500).json({ message: "Failed to load pending students." });
    }
});
// Approve a specific student — 🔒 Teachers only
router.put('/students/approve/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Only teachers can approve students." });
        await User.findByIdAndUpdate(req.params.id, { status: 'approved' });
        res.status(200).json({ message: "Student Approved!" });
    } catch (err) {
        res.status(500).json({ message: "Approval Failed" });
    }
});


// FACULTY PROFILES
//  Get all Teachers for the Public Faculty Page
router.get('/faculty', async (req, res) => {
    try {
        // Fetch users who are teachers. We use .select('-password') to keep passwords completely hidden!
        const faculty = await User.find({ role: 'teacher', status: 'approved' }).select('-password');
        res.status(200).json(faculty);
    } catch (err) {
        res.status(500).json({ message: "Failed to load faculty" });
    }
});

// Update Teacher Profile — 🔒 Only the owner can update their own profile
router.put('/profile/:username', authMiddleware, upload.single('profilePic'), async (req, res) => {
    try {
        // 🔒 Ownership check — you can only edit YOUR own profile
        if (req.user.username !== req.params.username) {
            return res.status(403).json({ message: "You can only update your own profile." });
        }

        const { qualifications, bio } = req.body;
        const updateData = {};

        if (qualifications) updateData.qualifications = qualifications;
        if (bio) updateData.bio = bio;
        if (req.file) updateData.profilePicture = req.file.path;

        const updatedUser = await User.findOneAndUpdate(
            { username: req.params.username },
            { $set: updateData },
            { new: true }
        ).select('-password');

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Profile Update Error:", err);
        res.status(500).json({ message: "Failed to update profile" });
    }
});
// --- 4. UPLOAD FILE ROUTE ---
// Upload a Resource or Magazine (Upgraded for Cloudinary)
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const newResource = new Resource({
            title: req.body.title,
            type: req.body.type,
            uploader: req.body.uploader,
            role: req.body.role,
            semester: req.body.semester || '',
            subject: req.body.subject || '',
            topic: req.body.topic || '',
            filePath: req.file.path 
        });
        await newResource.save();
        res.status(201).json(newResource);
    } catch (err) { 
        console.error("Cloudinary Upload Error:", err);
        res.status(500).json({ message: "Cloudinary Upload Failed" }); 
    }
});
// Get all files (SECURED WITH RBAC)
router.get('/resources', async (req, res) => {
    try {
        const { role } = req.query; // See who is asking
        let query = {};
        
        // 🔒 If the user is an outsider (not logged in), hide the academic notes
        if (!role || role === 'outsider' || role === 'undefined') {
            query = { type: { $ne: 'Resource' } }; // $ne means "Not Equal to"
        }

        const files = await Resource.find(query).sort({ date: -1 });
        res.status(200).json(files);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch resources" });
    }
});
// --- 6. BLOG ROUTE ---
// ---   BLOG API ---

// 1. Post a new Blog 
router.post('/blogs', upload.fields([
    { name: 'image', maxCount: 1 }, 
    { name: 'infographic', maxCount: 1 }, 
    { name: 'document', maxCount: 1 }
]), async (req, res) => {
    try {
        const { title, content, author, role } = req.body;
        
        let imagePath = req.files && req.files['image'] ? req.files['image'][0].path : null;
        let infographicPath = req.files && req.files['infographic'] ? req.files['infographic'][0].path : null;
        let documentPath = req.files && req.files['document'] ? req.files['document'][0].path : null;

        const status = role === 'student' ? 'pending' : 'approved';

        const newBlog = new Blog({ title, content, author, imagePath, infographicPath, documentPath, status }); 
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (err) { res.status(500).json({ message: "Failed to publish blog." }); }
});

// 2. Get All APPROVED Blogs (For the main public page)
router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find({ status: { $ne: 'pending' } }).sort({ date: -1 });
        res.status(200).json(blogs);
    } catch (err) { res.status(500).json({ message: "Failed to fetch blogs." }); }
});

// 3. Get All PENDING Blogs (For the Teacher Dashboard)
router.get('/blogs/pending', async (req, res) => {
    try {
        const blogs = await Blog.find({ status: 'pending' }).sort({ date: -1 });
        res.status(200).json(blogs);
    } catch (err) { res.status(500).json({ message: "Failed to fetch pending blogs." }); }
});

// 4. Approve a Pending Blog
router.put('/blogs/approve/:id', async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
        res.status(200).json(updatedBlog);
    } catch (err) { res.status(500).json({ message: "Failed to approve blog." }); }
});

// --- 7. DELETE RESOURCE (Notes & Magazines) — 🔒 Teachers only ---
router.delete('/resources/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Only teachers can delete resources." });
        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: "File not found" });
        await Resource.findByIdAndDelete(req.params.id);
        res.json({ message: "Resource deleted successfully" });
    } catch (err) {
        console.error("Delete Resource Error:", err);
        res.status(500).json({ message: "Failed to delete resource" });
    }
});

// --- 8. DELETE BLOG — 🔒 Teachers only ---
router.delete('/blogs/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Only teachers can delete blogs." });
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog deleted successfully" });
    } catch (err) { res.status(500).json({ message: "Failed to delete blog" }); }
});

// DIGITAL NOTICE BOARD
// Post a Notice — 🔒 Teachers only (role verified from JWT, not body)
router.post('/notices', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        const { title, content, author } = req.body;

        // 🔒 Role read from verified JWT token — cannot be faked
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Only teachers can post notices." });

        const newNotice = new Notice({
            title,
            content,
            author,
            filePath: req.file ? req.file.path : null
        });

        await newNotice.save();
        res.status(201).json({ message: "Notice published successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to publish notice." });
    }
});

// Get all Notices (Public - anyone can see notices)
router.get('/notices', async (req, res) => {
    try {
        const notices = await Notice.find().sort({ date: -1 }); // Newest first
        res.status(200).json(notices);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch notices." });
    }
});

// Delete a Notice — 🔒 Teachers only
router.delete('/notices/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Only teachers can delete notices." });
        await Notice.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Notice deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete notice" });
    }
});
//  Create a New Post 
router.post('/research-feed', upload.fields([
    { name: 'photo', maxCount: 1 }, 
    { name: 'document', maxCount: 1 }
]), async (req, res) => {
    try {
        const { title, caption, author, role } = req.body;
        
        const newPost = new ResearchPost({
            title,
            caption,
            author,
            role,
            // Check if a photo was uploaded, save path
            imagePath: req.files && req.files['photo'] ? req.files['photo'][0].path : null,
            // Check if a document was uploaded, save path
            documentPath: req.files && req.files['document'] ? req.files['document'][0].path : null
        });

        await newPost.save();
        res.status(201).json({ message: "Research published successfully!" });
    } catch (err) {
        console.error("Feed Upload Error:", err);
        res.status(500).json({ message: "Failed to publish research." });
    }
});
// 2. Get the Feed (Public - anyone can see the portfolio)
router.get('/research-feed', async (req, res) => {
    try {
        // Fetch all posts and sort by newest first (-1)
        const posts = await ResearchPost.find().sort({ date: -1 }); 
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch feed." });
    }
});

// 3. Delete a Post (Moderation)
router.delete('/research-feed/:id', async (req, res) => {
    try {
        await ResearchPost.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
});
// ==========================================
//  DEPARTMENT EVENT GALLERY API
// ==========================================

// ---  HIGHLIGHTS (Categories) ---

// 1. Create a New Highlight Category — 🔒 Teachers only (role from JWT)
router.post('/events/highlight', authMiddleware, async (req, res) => {
    try {
        const { title, author } = req.body;
        // 🔒 Role verified from JWT — cannot be spoofed from body
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Unauthorized" });

        const newHighlight = new EventHighlight({ title, createdBy: author });
        await newHighlight.save();
        res.status(201).json(newHighlight);
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ message: "Category name already exists." });
        res.status(500).json({ message: "Failed to create category." });
    }
});

// 2. Get All Highlight Categories (For the main gallery page & upload dropdown)
router.get('/events/highlights', async (req, res) => {
    try {
        const highlights = await EventHighlight.find();
        res.status(200).json(highlights);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch categories." });
    }
});

// ---  EVENT ALBUM POSTS ---

// 3. Create a New Album Post (Upload MULTIPLE photos at once)
router.post('/events/post', upload.array('photos', 20), async (req, res) => {
    try {
        const { highlightId, title, caption, author, role } = req.body;
        if (!req.files || req.files.length === 0) return res.status(400).json({ message: "No photos selected." });

        // Map through the uploaded files and get their Cloudinary paths
        const imagePaths = req.files.map(file => file.path); 

        const newPost = new EventPost({ highlightId, title, caption, imagePaths, author, role });
        await newPost.save();
        res.status(201).json({ message: "Album published successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Failed to publish album." });
    }
});

// 4. Get All Posts for a Specific Highlight Category
router.get('/events/posts/:highlightId', async (req, res) => {
    try {
        // Find posts that belong to the requested folder ID, sort by newest first
        const posts = await EventPost.find({ highlightId: req.params.highlightId }).sort({ date: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch albums." });
    }
});
// 5. Re-Edit a Highlight Category Name
router.put('/events/highlight/:id', async (req, res) => {
    try {
        const updatedHighlight = await EventHighlight.findByIdAndUpdate(
            req.params.id, 
            { title: req.body.title }, 
            { new: true }
        );
        res.status(200).json(updatedHighlight);
    } catch (err) { res.status(500).json({ message: "Failed to update category" }); }
});

// 6. Re-Edit an Album Post (Title and Caption)
router.put('/events/post/:id', async (req, res) => {
    try {
        const { title, caption } = req.body;
        const updatedPost = await EventPost.findByIdAndUpdate(
            req.params.id,
            { title, caption },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (err) { res.status(500).json({ message: "Failed to update album" }); }
});

// 7. Delete an Event Album (Gallery Post)
router.delete('/events/post/:id', async (req, res) => {
    try {
        const post = await EventPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Album not found" });
        await EventPost.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Album deleted successfully" });
    } catch (err) {
        console.error("Delete Album Error:", err);
        res.status(500).json({ message: "Failed to delete album" });
    }
});
// ---  ACHIEVEMENTS & PORTFOLIO API ---

// 1. Post a new Achievement (Supports Multiple Images)
router.post('/achievements', upload.array('photos', 10), async (req, res) => {
    try {
        const { category, studentsInvolved, description, author, authorRole } = req.body;
        // Correctly extract Cloudinary URLs for the array
        const imagePaths = req.files ? req.files.map(file => file.path) : [];

        const newPost = new Achievement({ category, studentsInvolved, description, imagePaths, author, authorRole });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: "Failed to post achievement." });
    }
});
// 2. Get Achievements by Category
router.get('/achievements/:category', async (req, res) => {
    try {
        const posts = await Achievement.find({ category: req.params.category }).sort({ date: -1 });
        res.status(200).json(posts);
    } catch (err) { res.status(500).json({ message: "Failed to fetch feed." }); }
});

// 3. Delete an Achievement
router.delete('/achievements/:id', async (req, res) => {
    try {
        await Achievement.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ message: "Failed to delete" }); }
});
// ==========================================
// 🖼️ HOMEPAGE CAROUSEL ROUTES
// ==========================================

// Fetch the slides for the homepage
router.get('/carousel', async (req, res) => {
    try {
        const slides = await Carousel.find().sort({ createdAt: -1 }).limit(5);
        res.json(slides);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch slides" });
    }
});

// Upload a new banner from the Teacher Dashboard
router.post('/carousel', upload.single('image'), async (req, res) => {
    try {
        const newSlide = new Carousel({
            title: req.body.title,
            imageUrl: req.file.path,
            uploadedBy: req.body.uploaderName
        });
        await newSlide.save();
        res.status(201).json({ message: "Slide added successfully", slide: newSlide });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to upload slide" });
    }
});
// Delete a homepage slider banner
router.delete('/carousel/:id', async (req, res) => {
    try {
        await Carousel.findByIdAndDelete(req.params.id);
        res.json({ message: "Slide deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete slide" });
    }
});
module.exports = router;