# FlowDesk CRM 🚀

A modern full-stack CRM platform built for admissions teams and counselors to manage student leads, automate follow-ups, monitor conversions, and streamline admissions workflows in real time.

---

# 🌟 Features

## 🔐 Authentication & Security
- JWT-based authentication
- Role-based access control (Admin / Counselor)
- Secure password hashing with bcryptjs
- Protected routes
- Change password functionality

---

## 👥 Lead Management
- Add / Edit / Delete leads
- Assign counselors to leads
- Lead status tracking
- Priority management
- Notes & follow-up scheduling
- Search & filter leads
- Real-time lead updates using Socket.IO

---

## 📊 Dashboard Analytics
- Total leads overview
- Lead conversion tracking
- Status-wise statistics
- Counselor performance monitoring
- Beautiful charts & analytics UI

---

## 🎨 Modern UI/UX
- Premium SaaS-inspired design
- Fully responsive layout
- Dark / Light theme support
- Animated authentication pages
- Modern modal forms
- Glassmorphism cards
- Production-ready interface

---

## ⚡ Real-Time Features
- Live lead updates
- Socket.IO integration
- Instant dashboard refresh
- Dynamic notifications

---

## ⚙️ Settings & Preferences
- Update profile information
- Change password
- Theme switching
- Notification preferences

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Socket.IO Client
- CSS3

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Socket.IO

---

# 📂 Project Structure

```bash
FlowDesk-CRM/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   └── context/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
```

---

# 🚀 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/flowdesk-crm.git
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd ../server
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside `server/`

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:3000
```

---

# ▶️ Run Application

## Start Backend

```bash
cd server
npm run dev
```

---

## Start Frontend

```bash
cd frontend
npm start
```

---

# 🌐 Application URLs

Frontend:

```bash
http://localhost:3000
```

Backend:

```bash
http://localhost:5000
```

---

# 📸 Screenshots

- Modern authentication UI
- Lead management dashboard
- Analytics dashboard
- Real-time lead tracking
- Settings & profile management

(Add screenshots here)

---

# 🔮 Future Improvements

- Email automation
- WhatsApp integration
- AI lead scoring
- CSV export
- Advanced reporting
- Calendar integrations
- Notifications center
- Activity logs

---

# 🧠 Learning Outcomes

This project helped in understanding:

- Full-stack MERN development
- REST APIs
- Authentication systems
- Real-time communication
- Role-based authorization
- State management
- Production-ready UI design
- MongoDB relationships
- Socket.IO integration

---

# 👩‍💻 Author

### Geetansha Dutt

Built with ❤️ using the MERN Stack.

---

# 📜 License

This project is licensed under the MIT License.
