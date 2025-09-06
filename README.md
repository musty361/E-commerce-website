# E-commerce App with Stripe Payments

## 🚀 Features
- Beautiful gradient landing page
- Product listing + cart
- Stripe Checkout integration

## ⚙️ Setup

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Add environment variable
Create `.env.local` inside `frontend/`:
```
STRIPE_SECRET_KEY=sk_test_12345   # replace with your Stripe test key
```

### 3. Run locally
```bash
npm run dev
```

Open 👉 http://localhost:3000

- Landing page at `/`
- Shop at `/shop`
- Secure Stripe payments
