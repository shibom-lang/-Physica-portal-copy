#  Physica Portal

<div align="center">

![Physica Portal](https://img.shields.io/badge/Physica-Portal-brightgreen?style=for-the-badge&logo=atom)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

**A full-stack web portal for the Physics Department — featuring real-time updates, role-based access control, faculty profiles, student blogs, event galleries, and more.**

[🌐 Live Site](https://physica-portal-production.up.railway.app) · [🐛 Report Bug](https://github.com/shibom-lang/Physica-portal/issues) · [✨ Request Feature](https://github.com/shibom-lang/Physica-portal/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Security](#-security)
- [Deployment](#-deployment)

---

## 🎯 About The Project

Physica Portal is the official web platform for a college Physics Department. It provides a centralized hub for students and faculty to share resources, publish blogs, post notices, upload research, and manage academic content — all with real-time live visitor tracking via WebSockets.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Role-Based Access** | Separate dashboards for Teachers and Students |
| 📚 **Resource Library** | Upload and download notes, magazines, PDFs |
| 📝 **Blog System** | Students submit blogs, teachers approve/reject |
| 📢 **Notice Board** | Teachers post official department notices |
| 🖼️ **Event Gallery** | Photo albums organized by event categories |
| 👨‍🏫 **Faculty Profiles** | Public teacher profiles with bio and qualifications |
| 🔬 **Research Feed** | Share research papers and academic work |
| 🏆 **Achievements** | Showcase department and student achievements |
| 🎠 **Homepage Carousel** | Dynamic banner management for teachers |
| 🟢 **Live Visitor Count** | Real-time active user tracking via WebSockets |
| ☁️ **Cloud Storage** | All media uploads handled via Cloudinary |

---

## 🛠️ Tech Stack

**Frontend**
- Pure HTML5, CSS3, Vanilla JavaScript
- Socket.IO client for real-time features

**Backend**
- Node.js + Express.js
- MongoDB Atlas + Mongoose ODM
- Socket.IO for WebSocket connections
- JWT (JSON Web Tokens) for authentication
- bcrypt.js for password hashing
- Cloudinary + Multer for file/image uploads
- express-rate-limit for brute force protection

**Deployment**
- 🚂 Railway (backend hosting)
- 🍃 MongoDB Atlas (cloud database)
- ☁️ Cloudinary (media storage)

---

## 📁 Project Structure

```
physica-portal/
│
├── 📄 Physica.html          # Main frontend (single-page application)
├── 🎨 Physica.css           # Stylesheet
├── 🚀 server.js             # Express server entry point
├── 🌱 seed.js               # Database seeder script
│
├── 📂 routes/
│   └── api.js               # All API route handlers
│
├── 📂 middleware/
│   └── auth.js              # JWT authentication middleware
│
├── 📂 models/
│   └── schemas.js           # Mongoose database schemas
│
├── 📂 uploads/              # Local upload temp (Cloudinary used in prod)
│
├── 📄 package.json          # Dependencies and scripts
├── 📄 .env                  # Environment variables (not committed)
└── 📄 .gitignore            # Git ignore rules
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/shibom-lang/Physica-portal.git
cd Physica-portal

# 2. Install dependencies
npm install

# 3. Create .env file (see Environment Variables section)
# Fill in your credentials

# 4. Start the server
npm start
```

Server runs on `http://localhost:5001`

---

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following keys:

```env
MONGODB_URI=mongodb_atlas_connection_string
TEACHER_SECRET_CODE=teacher_registration_code
CLOUDINARY_NAME=cloudinary_cloud_name
CLOUDINARY_API_KEY=cloudinary_api_key
CLOUDINARY_API_SECRET=cloudinary_api_secret
JWT_SECRET=jwt_secret_key
PORT=5001
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## 📡 API Reference

### Authentication
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/login` | Login user, returns JWT token | Public |
| `POST` | `/api/register` | Register new user | Public |

### Faculty & Profiles
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/faculty` | Get all teacher profiles | Public |
| `PUT` | `/api/profile/:username` | Update teacher profile | 🔒 Owner only |

### Resources
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/resources` | Get files (RBAC filtered) | Public |
| `POST` | `/api/upload` | Upload a resource | 🔒 Logged in |
| `DELETE` | `/api/resources/:id` | Delete a resource | 🔒 Teacher |

### Blogs
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/blogs` | Get approved blogs | Public |
| `POST` | `/api/blogs` | Submit a blog | 🔒 Logged in |
| `GET` | `/api/blogs/pending` | Get pending blogs | 🔒 Teacher |
| `PUT` | `/api/blogs/approve/:id` | Approve a blog | 🔒 Teacher |
| `DELETE` | `/api/blogs/:id` | Delete a blog | 🔒 Teacher |

### Notices
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/notices` | Get all notices | Public |
| `POST` | `/api/notices` | Post a notice | 🔒 Teacher |
| `DELETE` | `/api/notices/:id` | Delete a notice | 🔒 Teacher |

### Students
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/students/pending` | Get pending students | 🔒 Teacher |
| `PUT` | `/api/students/approve/:id` | Approve a student | 🔒 Teacher |

### Event Gallery
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/events/highlights` | Get all categories | Public |
| `POST` | `/api/events/highlight` | Create category | 🔒 Teacher |
| `POST` | `/api/events/post` | Upload album | 🔒 Logged in |
| `GET` | `/api/events/posts/:id` | Get posts by category | Public |
| `DELETE` | `/api/events/post/:id` | Delete album | 🔒 Teacher |

### Achievements & Carousel
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/achievements/:category` | Get achievements | Public |
| `POST` | `/api/achievements` | Post achievement | 🔒 Logged in |
| `GET` | `/api/carousel` | Get carousel slides | Public |
| `POST` | `/api/carousel` | Add carousel slide | 🔒 Teacher |
| `DELETE` | `/api/carousel/:id` | Delete slide | 🔒 Teacher |

---

## 🔒 Security

- **JWT Authentication** — All protected routes require a valid Bearer token
- **bcrypt Password Hashing** — Passwords are never stored in plain text
- **Role-Based Access Control** — Teacher/Student permissions enforced server-side via JWT
- **Rate Limiting** — Login endpoint limited to 10 attempts per 15 minutes per IP
- **Environment Variables** — All secrets stored in `.env`, never committed to Git
- **Profile Ownership** — Teachers can only update their own profile
- **Student Approval Flow** — New students require teacher approval before login

---

## 🚂 Deployment

This project is deployed on **Railway** with automatic GitHub deployments.

**Required Railway Environment Variables:**
```
MONGODB_URI
TEACHER_SECRET_CODE
CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
JWT_SECRET
PORT
```

Every push to the `main` branch triggers an automatic redeploy on Railway.

---

## 👨‍💻 Contributing

This project is open for developers to learn from. Feel free to fork, explore, and build upon it.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available for educational purposes.

---

<div align="center">
Made with ❤️ for the Physics Department
</div>

