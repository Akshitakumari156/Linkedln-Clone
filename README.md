# 🌐 LinkedIn Profile Page Clone

This project is a **LinkedIn-style profile page** built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.  
It allows users to create, view, and delete posts, as well as display their personal profile information such as profile image, name, and email.

---
## 🌐 Deployed

The backend of this project is live and can be accessed here:  
👉 [https://linkedln-clone-neon.vercel.app/](https://linkedln-clone-neon.vercel.app/)

---
## 🚀 Features

✅ **User Profile Section**
- Displays user profile picture, name, and email ID.  

✅ **Create Posts**
- Users can create posts with text and optional images.  
- Posts are saved to MongoDB with the user's ID reference.  

✅ **View Posts**
- Displays all posts created by the logged-in user.  
- Posts show user details, caption, and uploaded image.  

✅ **Delete Posts**
- Users can delete their own posts instantly.  

---

## 🛠️ Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js + Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **File Uploads** | Multer |
| **API Handling** | Axios |
| **Runtime Environment** | Node.js |

---
## ⚙️ How to Run the Project
---

```bash
git clone https://github.com/your-username/linkedin-profile-clone.git
cd linkedin-profile-clone

### . Install Dependencies

### 🧩 Backend
```bash
cd backend
npm install

###💻 Frontend
cd ../frontend
npm install
3. Set Up Environment Variables

Create a .env file in the backend folder and add the following lines:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

▶️ 4. Run Locally
🚀 Start Backend
cd backend
npm start

🌐 Start Frontend
cd ../frontend
npm run dev
