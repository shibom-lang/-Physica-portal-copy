const jwt = require('jsonwebtoken');

// ============================================================
// 🔒 AUTH MIDDLEWARE — Physica Security Guard
// ============================================================
// Plug this into any route that requires a logged-in user.
// Usage: router.delete('/notices/:id', authMiddleware, async (req, res) => { ... })
//
// On success: attaches req.user = { id, username, role }
// On failure: returns 401 (no token) or 403 (invalid/expired token)
// ============================================================

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, username, role }
        next(); // ✅ Token valid — allow request to proceed
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token. Please log in again." });
    }
};

module.exports = authMiddleware;
