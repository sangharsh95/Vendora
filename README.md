# 🛒 Vendora (GoCart)
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
Vendora is a modern, robust full-stack e-commerce application built to deliver a seamless and secure shopping experience. 
## ✨ Features
- **Modern Frontend**: Built with Next.js App Router for optimal performance and SEO.
- **Secure Payments**: Fully integrated with Stripe for safe and reliable checkout flows.
- **Database Architecture**: Structured using Prisma ORM for efficient relational data management.
- **Dynamic Promotions**: Built-in coupon and discount engine.
- **Comprehensive Testing**: End-to-end and UI testing configured to ensure platform stability.
## 👥 Meet the Team
This project was developed collaboratively by:
- **Sangharsh Singh Yadav**
- **Sandeep Gaud**
- **Varchas Pandey**
- **Ravyansh Pandey**
- **Rishabh Kasaudhan**
- **Ranjeet Kumar**
## 🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v16.0 or higher)
- npm (or yarn/pnpm)
- A PostgreSQL/MySQL database (or SQLite depending on your Prisma config)
- A [Stripe Developer Account](https://stripe.com/)
### Installation & Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/vendora.git
   cd vendora
Install dependencies

bash


npm install
Environment Variables Create a .env file in the root directory and copy the contents from .env.example. Fill in your specific keys:

env


# Database
DATABASE_URL="your_database_url_here"
# Stripe
STRIPE_SECRET_KEY="your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_public_key"
Database Setup Run the Prisma migrations to set up your database schema and seed the initial data:

bash


npx prisma generate
npx prisma db push
# Optional: Seed the database with coupons/products
node seed-coupons.js
Run the Development Server

bash


npm run dev
Open http://localhost:3000 in your browser to view the application.

🧪 Testing
The project includes several testing scripts to verify system integrity:

bash


# Run API tests
node test-api.js
# Run Database tests
node test-db.js
# Run E2E tests
node test-e2e.js
