const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const { User } = require('./models/schemas');
require('dotenv').config(); 

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log("☁️ Connected to MongoDB Atlas Cloud securely...");

        await User.deleteMany({ username: "teacher1" });
        await User.deleteMany({ username: "student1" });

        // 🔒 Encrypt the password "123" before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("123", salt);

        // 2. Create a TEACHER
        await User.create({
            username: "teacher1",
            password: hashedPassword,
            role: "teacher",
            status: "approved", 
            name: "Dr. Physics",
            designation: "Professor",
            attendance: { jan: { attended: 0, total: 0 } }
        });

        // 3. Create a STUDENT
        await User.create({
            username: "student1",
            password: hashedPassword,
            role: "student",
            status: "pending", 
            name: "Rahul Sharma",
            semester: "4th Semester",
            attendance: { jan: { attended: 20, total: 25 }, feb: { attended: 18, total: 24 } }
        });

        console.log("✅ Live Cloud Users Created with Encrypted Passwords!");
        process.exit();
    })
    .catch(err => console.log("Database connection error: ", err));