const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs'); // SECURITY TOOL
const jwt = require('jsonwebtoken'); // 🔒 JWT for token generation & verification
const authMiddleware = require('../middleware/auth'); // 🔒 Auth guard for protected routes

// 🐛 BUG 1 FIXED: Added 'Attendance' to the imports so the file knows the schema exists!
const { User, Resource, Blog, Notice, ResearchPost, EventHighlight, EventPost, Achievement, Carousel, Attendance } = require('../models/schemas');

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

// ==========================================
// 🔒 AUTHENTICATION ROUTES
// ==========================================

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
            token // 🔑 Send token to frontend
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
});

// --- SECURE REGISTRATION ROUTE ---
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
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: finalUsername,
            password: hashedPassword,
            role: lowerRole,
            status, 
            name,
            rollNumber,
            designation,
            semester
            // 🐛 BUG 3 FIXED: Removed the old hardcoded attendance block here!
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
        const pendingStudents = await User.find({ role: 'student', status: 'pending' }).select('-password');
        res.status(200).json(pendingStudents);
    } catch (err) {
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

// ==========================================
// 👨‍🏫 FACULTY PROFILES
// ==========================================

// Get all Teachers for the Public Faculty Page
router.get('/faculty', async (req, res) => {
    try {
        const faculty = await User.find({ role: 'teacher', status: 'approved' }).select('-password');
        res.status(200).json(faculty);
    } catch (err) {
        res.status(500).json({ message: "Failed to load faculty" });
    }
});

// Update Teacher Profile — 🔒 Only the owner can update their own profile
router.put('/profile/:username', authMiddleware, upload.single('profilePic'), async (req, res) => {
    try {
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
        res.status(500).json({ message: "Failed to update profile" });
    }
});

// ==========================================
// 📚 RESOURCES & MAGAZINES
// ==========================================

// Upload a Resource or Magazine 🔒 Teachers only
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Unauthorized." });
        
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
        res.status(500).json({ message: "Cloudinary Upload Failed" }); 
    }
});

// Get all files
router.get('/resources', async (req, res) => {
    try {
        const { role } = req.query; 
        let query = {};
        
        if (!role || role === 'outsider' || role === 'undefined') {
            query = { type: { $ne: 'Resource' } }; 
        }

        const files = await Resource.find(query).sort({ date: -1 });
        res.status(200).json(files);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch resources" });
    }
});

// Delete Resource (Notes & Magazines) — 🔒 Teachers only
router.delete('/resources/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Only teachers can delete resources." });
        await Resource.findByIdAndDelete(req.params.id);
        res.json({ message: "Resource deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete resource" });
    }
});

// ==========================================
// 📝 DEPARTMENT JOURNAL (BLOGS)
// ==========================================

// Post a new Blog 🔒 Must be logged in
router.post('/blogs', authMiddleware, upload.fields([
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

// Get All APPROVED Blogs
router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find({ status: { $ne: 'pending' } }).sort({ date: -1 });
        res.status(200).json(blogs);
    } catch (err) { res.status(500).json({ message: "Failed to fetch blogs." }); }
});

// Get All PENDING Blogs 🔒 Teachers only
router.get('/blogs/pending', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Unauthorized." });
        const blogs = await Blog.find({ status: 'pending' }).sort({ date: -1 });
        res.status(200).json(blogs);
    } catch (err) { res.status(500).json({ message: "Failed to fetch pending blogs." }); }
});

// Approve a Pending Blog 🔒 Teachers only
router.put('/blogs/approve/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Unauthorized." });
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
        res.status(200).json(updatedBlog);
    } catch (err) { res.status(500).json({ message: "Failed to approve blog." }); }
});

// Delete Blog — 🔒 Teachers only
router.delete('/blogs/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Only teachers can delete blogs." });
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog deleted successfully" });
    } catch (err) { res.status(500).json({ message: "Failed to delete blog" }); }
});

// ==========================================
// 📢 DIGITAL NOTICE BOARD
// ==========================================

// Post a Notice — 🔒 Teachers only
router.post('/notices', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        const { title, content, author } = req.body;
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Only teachers can post notices." });

        const newNotice = new Notice({
            title, content, author,
            filePath: req.file ? req.file.path : null
        });

        await newNotice.save();
        res.status(201).json({ message: "Notice published successfully!" });
    } catch (err) { res.status(500).json({ message: "Failed to publish notice." }); }
});

// Get all Notices
router.get('/notices', async (req, res) => {
    try {
        const notices = await Notice.find().sort({ date: -1 });
        res.status(200).json(notices);
    } catch (err) { res.status(500).json({ message: "Failed to fetch notices." }); }
});

// Delete a Notice — 🔒 Teachers only
router.delete('/notices/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Only teachers can delete notices." });
        await Notice.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Notice deleted" });
    } catch (err) { res.status(500).json({ message: "Failed to delete notice" }); }
});

// ==========================================
// 🔬 RESEARCH FEED
// ==========================================

// Create a New Post 🔒 Must be logged in
router.post('/research-feed', authMiddleware, upload.fields([
    { name: 'photo', maxCount: 1 }, 
    { name: 'document', maxCount: 1 }
]), async (req, res) => {
    try {
        const { title, caption, author, role } = req.body;
        const newPost = new ResearchPost({
            title, caption, author, role,
            imagePath: req.files && req.files['photo'] ? req.files['photo'][0].path : null,
            documentPath: req.files && req.files['document'] ? req.files['document'][0].path : null
        });

        await newPost.save();
        res.status(201).json({ message: "Research published successfully!" });
    } catch (err) { res.status(500).json({ message: "Failed to publish research." }); }
});

// Get the Feed 
router.get('/research-feed', async (req, res) => {
    try {
        const posts = await ResearchPost.find().sort({ date: -1 }); 
        res.status(200).json(posts);
    } catch (err) { res.status(500).json({ message: "Failed to fetch feed." }); }
});

// Delete a Post 🔒 Teachers only
router.delete('/research-feed/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Unauthorized: Only teachers can delete posts." });
        await ResearchPost.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) { res.status(500).json({ message: "Delete failed" }); }
});

// ==========================================
// 📸 DEPARTMENT EVENT GALLERY
// ==========================================

// Create a New Highlight Category — 🔒 Teachers only 
router.post('/events/highlight', authMiddleware, async (req, res) => {
    try {
        const { title, author } = req.body;
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Unauthorized" });

        const newHighlight = new EventHighlight({ title, createdBy: author });
        await newHighlight.save();
        res.status(201).json(newHighlight);
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ message: "Category name already exists." });
        res.status(500).json({ message: "Failed to create category." });
    }
});

// Get All Highlight Categories 
router.get('/events/highlights', async (req, res) => {
    try {
        const highlights = await EventHighlight.find();
        res.status(200).json(highlights);
    } catch (err) { res.status(500).json({ message: "Failed to fetch categories." }); }
});

// Create a New Album Post 🔒 Must be logged in
router.post('/events/post', authMiddleware, upload.array('photos', 20), async (req, res) => {
    try {
        const { highlightId, title, caption, author, role } = req.body;
        if (!req.files || req.files.length === 0) return res.status(400).json({ message: "No photos selected." });

        const imagePaths = req.files.map(file => file.path); 
        const newPost = new EventPost({ highlightId, title, caption, imagePaths, author, role });
        await newPost.save();
        res.status(201).json({ message: "Album published successfully!" });
    } catch (err) { res.status(500).json({ message: "Failed to publish album." }); }
});

// Get All Posts for a Specific Highlight Category
router.get('/events/posts/:highlightId', async (req, res) => {
    try {
        const posts = await EventPost.find({ highlightId: req.params.highlightId }).sort({ date: -1 });
        res.status(200).json(posts);
    } catch (err) { res.status(500).json({ message: "Failed to fetch albums." }); }
});

// Re-Edit a Highlight Category Name 🔒 Teachers only
router.put('/events/highlight/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Unauthorized" });
        const updatedHighlight = await EventHighlight.findByIdAndUpdate(
            req.params.id, { title: req.body.title }, { new: true }
        );
        res.status(200).json(updatedHighlight);
    } catch (err) { res.status(500).json({ message: "Failed to update category" }); }
});

// Re-Edit an Album Post 🔒 Teachers only
router.put('/events/post/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Unauthorized" });
        const { title, caption } = req.body;
        const updatedPost = await EventPost.findByIdAndUpdate(
            req.params.id, { title, caption }, { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (err) { res.status(500).json({ message: "Failed to update album" }); }
});

// Delete an Event Album 🔒 Teachers only
router.delete('/events/post/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Unauthorized" });
        await EventPost.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Album deleted successfully" });
    } catch (err) { res.status(500).json({ message: "Failed to delete album" }); }
});

// ==========================================
// 🏆 ACHIEVEMENTS & PORTFOLIO
// ==========================================

// Post a new Achievement 🔒 Must be logged in
router.post('/achievements', authMiddleware, upload.array('photos', 10), async (req, res) => {
    try {
        const { category, studentsInvolved, description, author, authorRole } = req.body;
        const imagePaths = req.files ? req.files.map(file => file.path) : [];

        const newPost = new Achievement({ category, studentsInvolved, description, imagePaths, author, authorRole });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) { res.status(500).json({ message: "Failed to post achievement." }); }
});

// Get Achievements by Category
router.get('/achievements/:category', async (req, res) => {
    try {
        const posts = await Achievement.find({ category: req.params.category }).sort({ date: -1 });
        res.status(200).json(posts);
    } catch (err) { res.status(500).json({ message: "Failed to fetch feed." }); }
});

// Delete an Achievement 🔒 Teachers only
router.delete('/achievements/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: "Unauthorized" });
        await Achievement.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ message: "Failed to delete" }); }
});

// ==========================================
// 🎠 HOMEPAGE CAROUSEL
// ==========================================

// Fetch the slides for the homepage
router.get('/carousel', async (req, res) => {
    try {
        const slides = await Carousel.find().sort({ createdAt: -1 }).limit(5);
        res.json(slides);
    } catch (err) { res.status(500).json({ error: "Failed to fetch slides" }); }
});

// Upload a new banner 🔒 Teachers only
router.post('/carousel', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ error: "Unauthorized" });
        const newSlide = new Carousel({
            title: req.body.title,
            imageUrl: req.file.path,
            uploadedBy: req.body.uploaderName
        });
        await newSlide.save();
        res.status(201).json({ message: "Slide added", slide: newSlide });
    } catch (err) { res.status(500).json({ error: "Failed to upload slide" }); }
});

// Delete a homepage slider banner 🔒 Teachers only
router.delete('/carousel/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ error: "Unauthorized" });
        await Carousel.findByIdAndDelete(req.params.id);
        res.json({ message: "Slide deleted successfully" });
    } catch (err) { res.status(500).json({ error: "Failed to delete slide" }); }
});

// ==========================================
// ⏱️ IOT HARDWARE & ATTENDANCE ROUTES
// ==========================================
// 🐛 BUG 2 FIXED: The 3 new routes are successfully added here!

// 🤖 1. ARDUINO ENDPOINT (Receives Fingerprint Data)
router.post('/hardware/attendance', async (req, res) => {
    try {
        const { fingerprintId } = req.body;
        
        // Find who this fingerprint belongs to
        const student = await User.findOne({ fingerprintId: fingerprintId, role: 'student' });
        if (!student) return res.status(404).json({ error: "Fingerprint not registered to any student." });

        // Check if already marked present today
        const startOfDay = new Date(); startOfDay.setHours(0,0,0,0);
        const endOfDay = new Date(); endOfDay.setHours(23,59,59,999);
        
        const existingLog = await Attendance.findOne({
            studentId: student._id,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (existingLog) return res.status(200).json({ message: "Already marked present today." });

        // Save the daily log
        const log = new Attendance({
            studentId: student._id,
            name: student.name,
            rollNumber: student.rollNumber,
            semester: student.semester
        });
        await log.save();
        res.status(201).json({ message: "Attendance Marked!", student: student.name });

    } catch (err) { 
        res.status(500).json({ error: "Hardware communication failed." }); 
    }
});

// 📊 2. TEACHER ENDPOINT (The Aggregation Calculator!) 🔒 Teachers only
router.get('/attendance/semester/:sem', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ error: "Unauthorized" });
        
        // MONGODB MAGIC: We use .aggregate() to group the logs by Roll Number and count them up!
        const aggregatedData = await Attendance.aggregate([
            { $match: { semester: req.params.sem } }, // Step 1: Filter by the requested semester
            { $group: {
                _id: "$rollNumber",               // Step 2: Group everything by roll number
                name: { $first: "$name" },        // Grab their name
                totalPresent: { $sum: 1 },        // Step 3: Count how many logs they have!
                lastSeen: { $max: "$date" }       // Find their most recent scan
            }},
            { $sort: { name: 1 } }                // Step 4: Sort alphabetically by name
        ]);

        res.json(aggregatedData);
    } catch (err) { 
        console.error("Aggregation Error:", err);
        res.status(500).json({ error: "Failed to calculate attendance logs." }); 
    }
});

// 🧑‍🎓 3. STUDENT ENDPOINT (Fetch My Own Logs) 🔒 Must be logged in
router.get('/attendance/me', authMiddleware, async (req, res) => {
    try {
        const logs = await Attendance.find({ studentId: req.user.id }).sort({ date: -1 });
        res.json(logs);
    } catch (err) { 
        res.status(500).json({ error: "Failed to load logs" }); 
    }
});

module.exports = router;
