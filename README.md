# 🍔 FoodRush

## 📖 Project Description
**FoodRush** is a modern food delivery and order management web application where users can browse restaurants, order food, and manage their cart.  
The project is built with a **user-friendly interface**, **real-time data updates**, and **secure payment** features to make the food ordering process fast and easy.

---

## 🛠 Tech Stack

**Frontend:**
- Next.js (App Router)
- React.js
- Tailwind CSS
- Axios
- TanStack Query

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose

**Other Tools & Libraries:**
- NextAuth
- Stripe Payment Gateway
- React Icons
- ShadCN 

---

## ✨ Features

- **User Authentication** – Login/Register using Firebase
- **Browse Restaurants & Menus** – View restaurants and food by category
- **Search & Filter** – Quickly find desired food
- **Cart Management** – Add, update, and remove items from the cart
- **Order Placement** – Secure and fast ordering system
- **Checkout & Payment** – Online payment via Stripe
- **Responsive Design** – Optimized for all devices

---

## 🚀 Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/foodrush.git
cd foodrush

cd client
npm install
Backend:

cd server
npm install
3️⃣ Set Environment Variables
Frontend (.env.local)

NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
Backend (.env)

PORT=5000
MONGO_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_secret_key
FIREBASE_ADMIN_KEY=your_firebase_admin_key

4️⃣ Run Application

cd client
npm run dev
Backend:

cd server
npm start

📄 License
This project is for learning and personal use purposes only.


