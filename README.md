# 🍔 FoodRush

## 📖 Project Description
**FoodRush** is a modern and fully functional food delivery and order management web application. Users can explore restaurants, browse food items, add them to the cart, place orders, and complete secure online payments with ease.
The platform is built with **scalability**, **real-time updates**, **fast performance**, and a user-friendly UI to ensure a smooth ordering experience across all devices.

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
- SSLCommerz Payment Gateway
- React Icons
- ShadCN 

---

## ✨ Core Features

**Secure User Authentication:**
- Login/Register using Firebase and NextAuth
- JWT-based session handling
- Protected routes and role-based access

**Restaurant & Menu Browsing:**
- Browse restaurants and their menus
- Category-based food listing
- Smooth and responsive navigation

**Advanced Search & Filters:**
- Search food by name, type, or cuisine
- Filter by price, popularity, or category

**Smart Cart Management:**
- Add, remove, and update items instantly
- Real-time cart totals and item count
- User-specific cart persistence

**Order Placement & Tracking:**
- Place orders with confirmation
- View order history
- Order status tracking (Pending/Processing/Completed)

**Secure Online Checkout & Payment:**
- SSLCommerz integration for online payments
- Order summary and invoice generation during checkout

**Fully Responsive UI:**
- Optimized for mobile, tablet, and desktop
- Clean, modern, and accessible design

**Real-Time Updates & Performance:**
- Real-time data fetching with TanStack Query
- Fast API communication using Axios
- Optimized rendering and lazy loading

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


