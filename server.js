const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit'); // 🔒 Rate limiting
require('dotenv').config(); // 🔒 Load the secret environment variables

const apiRoutes = require('./routes/api');

const app = express();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const PORT = process.env.PORT || 5001;

// 🔒 CORS — only allow requests from known origins
const allowedOrigins = [
    'http://localhost:5500',                                    // local dev (Live Server)
    'http://127.0.0.1:5500',                                   // local dev (alternate)
    'https://physica-portal-production.up.railway.app'         // 🚂 your real Railway URL
];

const io = new Server(server, { cors: { origin: allowedOrigins } });

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (file:// local open, Postman, mobile)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS blocked: ' + origin));
        }
    }
}));

// 🔒 RATE LIMITER — max 10 login attempts per 15 minutes per IP
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: { message: "Too many login attempts. Please try again in 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false
});
app.use('/api/login', loginLimiter);

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Now using process.env.MONGODB_URI instead of the hardcoded string
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ Connected to MongoDB Atlas (Cloud) securely!");
}).catch(err => {
    console.error("❌ Database Connection Error:", err);
});

app.use('/api', apiRoutes);
// 🔌 REAL-TIME WEBSOCKETS (LIVE TRAFFIC)
let activeUsers = 0;

io.on('connection', (socket) => {
    // 1. A new user opened the website!
    activeUsers++;
    
    // Broadcast the new total to EVERYONE currently on the website
    io.emit('visitorCountUpdate', activeUsers);

    // 2. The user closed the tab or lost internet
    socket.on('disconnect', () => {
        activeUsers--;
        io.emit('visitorCountUpdate', activeUsers);
    });
});
//  UNMASK CLOUDINARY ERRORS
app.use((err, req, res, next) => {
    console.error("EXACT CLOUDINARY ERROR:", JSON.stringify(err, null, 2));
    res.status(500).json({ message: "Upload failed. Check server logs." });
});
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} with WebSockets enabled`);
});
