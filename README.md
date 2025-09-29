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

## Dependencies

These are the required libraries and tools for the project:

- `@google/generative-ai`: 0.24.1 – Google Generative AI SDK for AI-powered features.
- `@radix-ui/react-avatar`: 1.1.10 – Avatar components for React UI.
- `@radix-ui/react-collapsible`: 1.1.11 – Collapsible UI components for React.
- `@radix-ui/react-dialog`: 1.1.14 – Dialog and modal components for React.
- `@radix-ui/react-dropdown-menu`: 2.1.15 – Dropdown menu components.
- `@radix-ui/react-separator`: 1.1.7 – UI separator components.
- `@radix-ui/react-slot`: 1.2.3 – Slot component for composable UI.
- `@radix-ui/react-tooltip`: 1.2.7 – Tooltip components.
- `@tanstack/react-query`: 5.81.5 – Powerful data-fetching and state management for React.
- `axios`: 1.9.0 – Promise-based HTTP client for browser and Node.js.
- `bcryptjs`: 3.0.2 – Password hashing library.
- `chart.js`: 4.5.0 – Flexible charting library.
- `class-variance-authority`: 0.7.1 – Conditional class management for React.
- `clsx`: 2.1.1 – Utility for conditional classNames.
- `jsonwebtoken`: 9.0.2 – JWT token creation and verification.
- `lucide-react`: 0.522.0 – Icon library for React.
- `mongodb`: 6.17.0 – MongoDB driver for Node.js.
- `mongoose`: 8.15.2 – MongoDB ODM.
- `next`: 15.3.3 – React framework for server-side rendering.
- `next-auth`: 4.24.11 – Authentication solution for Next.js.
- `qs`: 6.14.0 – Query string parsing and stringifying.
- `react`: 19.0.0 – Core React library.
- `react-chartjs-2`: 5.3.0 – React wrapper for Chart.js.
- `react-dom`: 19.0.0 – React DOM renderer.
- `react-icons`: 5.5.0 – Popular icon library for React.
- `react-toastify`: 11.0.5 – Toast notifications for React.
- `recharts`: 3.2.1 – Chart library built with React and D3.js.
- `sweetalert2`: 11.22.2 – Beautiful, responsive, customizable popups.
- `swiper`: 11.2.10 – Modern mobile touch slider with hardware accelerated transitions.
- `tailwind-merge`: 3.3.1 – Utility for merging Tailwind CSS classes.

## DevDependencies

These are the development tools and libraries used for the project:

- `@eslint/eslintrc`: ^3 – ESLint configuration utility for managing linting rules.
- `@tailwindcss/postcss`: ^4 – Tailwind CSS PostCSS plugin for processing styles.
- `eslint`: ^9 – JavaScript and TypeScript linter for enforcing code quality.
- `eslint-config-next`: 15.3.3 – ESLint configuration optimized for Next.js projects.
- `tailwindcss`: ^4 – Utility-first CSS framework for styling.
- `tw-animate-css`: ^1.3.4 – Tailwind CSS plugin for animations.

# 🛠 How to Run the Project Locally

## 📖 Table of Contents
- [Prerequisites](#prerequisites)
- [Step 1: Clone the Repository](#step-1-clone-the-repository)
- [Step 2: Install Dependencies](#step-2-install-dependencies)
- [Step 3: Set Up Environment Variables](#step-3-set-up-environment-variables)
- [Step 4: Start the Development Server](#step-4-start-the-development-server)
- [Step 5: Run the Backend (if applicable)](#step-5-run-the-backend-if-applicable)
- [Step 6: Test the Project](#step-6-test-the-project)
- [Step 7: Build for Production](#step-7-build-for-production)
- [Step 8: Troubleshooting](#step-8-troubleshooting)

---

## 🔧 Prerequisites

Before you start, make sure you have the following installed on your machine:

- **Node.js (v18+)** - [Download & Install](https://nodejs.org/)
- **Git** - [Download & Install](https://git-scm.com/)
- **MongoDB** - [Download & Install](https://www.mongodb.com/try/download/community) (or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **VS Code (or any code editor)** - [Download & Install](https://code.visualstudio.com/)
- **Vite** (optional, included in dependencies)

---

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jahidhasan6676/foodrush-bangladesh-website.git
cd foodrush-bangladesh-website
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following:

```env
# ✅ Database
DB_USER=your_database_user
DB_PASS=your_database_password
MONGODB_URI="your_mongodb_connection_string"

# ✅ NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URI=http://localhost:3000

# ✅ GitHub OAuth
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# ✅ Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# ✅ Image Hosting
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key

# ✅ Custom JWT Token (if used)
NEXT_PUBLIC_JWT_TOKEN=your_custom_jwt_token
```

4. Run the development server:

```bash
npm run dev
```