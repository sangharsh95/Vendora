---
marp: true
theme: default
class: lead
backgroundColor: #f8fafc
color: #0f172a
---

# 🛒 GoCart
## The Future of E-Commerce
A modern, scalable, and premium shopping experience built with Next.js.

---

# 🌟 Project Overview

**GoCart** is a full-stack e-commerce platform designed for speed, beautiful aesthetics, and seamless user experience. 

- **Target Audience**: Modern consumers expecting a premium UI.
- **Core Philosophy**: Performance-first, dynamic design, and robust security.
- **Key Features**: 
  - Dynamic Premium Product Cards
  - Wishlist & Cart Management
  - User Authentication & Order Tracking

---

# 🛠️ Technology Stack

We leveraged the most powerful tools in the modern web ecosystem:

- **Frontend Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (Utility-first, responsive design)
- **State Management**: Redux Toolkit (Global cart state)
- **Backend & Database**: Next.js API Routes + Prisma ORM + PostgreSQL
- **Authentication**: NextAuth.js (Secure session management)

---

# 🎨 Premium UI: The Product Card

To achieve a "WOW" factor, we implemented a dynamic squircle product card with smooth hover animations and a deterministic pastel background generator.

```javascript
// Deterministically pick a background color based on product ID
const getBackgroundColor = (id) => {
    if (!id) return PASTEL_COLORS[0];
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % PASTEL_COLORS.length;
    return PASTEL_COLORS[index];
}
```

---

# 🔐 Authentication Architecture

Security is paramount. We implemented **NextAuth.js** with a custom Credentials provider, tightly coupled with our Prisma database.

```javascript
// app/api/auth/[...nextauth]/route.js
CredentialsProvider({
    name: "Credentials",
    async authorize(credentials) {
        const user = await prisma.user.findUnique({
            where: { email: credentials.email }
        });
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");
        return user;
    }
})
```

---

# 🗄️ Database Schema (Prisma)

Our PostgreSQL database is strongly typed and relational, ensuring data integrity across the platform.

```prisma
model Order {
    id            String        @id @default(cuid())
    total         Float
    status        OrderStatus   @default(ORDER_PLACED)
    userId        String
    orderItems    OrderItem[]
    
    user          User          @relation(fields: [userId], references: [id])
}
```

---

# 🛒 State Management (Redux Toolkit)

The shopping cart requires real-time, global state updates across the application without hitting the database on every click.

```javascript
// lib/features/cart/cartSlice.js
addToCart: (state, action) => {
    const { productId } = action.payload
    if (state.cartItems[productId]) {
        state.cartItems[productId]++
    } else {
        state.cartItems[productId] = 1
    }
    state.total += 1
}
```

---

# 🚀 Future Roadmap

Where GoCart goes from here:

1. **Payment Gateway Integration**: Hooking up Stripe for seamless, secure checkout.
2. **Admin Dashboard**: A dedicated `/admin` portal for managing inventory, viewing analytics, and updating order statuses.
3. **AI Recommendations**: Using machine learning to suggest products based on purchase history.

---

# 💡 Thank You!
### Any Questions?

*Built with passion, code, and caffeine.*
