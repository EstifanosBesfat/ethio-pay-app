# 🇪🇹 EthioPay - Modern Financial Dashboard

A secure, full-stack financial dashboard built for the Ethiopian context. This application allows users to send and request money with real-time tracking, powered by a cloud database.

## 🚀 Live Demo
[Click here to view the live app](https://ethio-pay-app-89zp.vercel.app/)

## ✨ Features
- **User Authentication:** Secure Login & Sign Up (Supabase Auth).
- **Real-Time Database:** Transactions are saved instantly (Supabase PostgreSQL).
- **Security:** Row Level Security (RLS) ensures users only see their own data.
- **Ethio-Logic:** Custom validation for Ethiopian phone numbers (09/07...) and fee calculations.
- **Responsive UI:** Works seamlessly on Mobile and Desktop.

## 🛠 Tech Stack
- **Frontend:** React (Vite), TypeScript, Tailwind CSS (v4).
- **Backend:** Supabase (PostgreSQL, Auth).
- **Deployment:** Vercel.

## 📦 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ethio-pay-app.git
   cd ethio-pay-app
2. **Install dependencies**
```bash
   npm install
   Set up Environment Variables
   Create a .env.local file and add your Supabase keys:
3. **Env**
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
Run the App
npm run dev
**👨‍💻 Author**
Built by Estifanos Besfat as part of the Fullstack AI-Augmented Developer.
