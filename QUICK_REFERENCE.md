# 🚀 Quick Reference Guide

## Start Development

```bash
# Terminal 1 - Backend
cd server
npm run dev
# Runs on http://localhost:5000

# Terminal 2 - Frontend  
npm run dev
# Runs on http://localhost:5173
```

## Login Credentials (Demo Account)

```
Email: demo@samratsolar.com
Password: solar123
```

## Razorpay Test Card

```
Card: 4111 1111 1111 1111
Expiry: 12/25
CVV: 123
```

## Environment Setup

```bash
# Copy template
cp server/.env.example server/.env

# Edit server/.env and set:
RAZORPAY_KEY_ID=your_test_key
RAZORPAY_KEY_SECRET=your_test_secret
```

## Database Seeding

```bash
cd server
npm run seed
```

## Build Frontend

```bash
npm run build
# Output: dist/
```

## Check Backend Syntax

```bash
node --check server/index.js
node --check server/routes/auth.js
node --check server/routes/orders.js
```

## Key Files

| File | Purpose |
|------|---------|
| [src/context/AppContext.jsx](src/context/AppContext.jsx) | Global state & logic |
| [server/index.js](server/index.js) | Express setup & middleware |
| [server/routes/orders.js](server/routes/orders.js) | Order & payment endpoints |
| [server/services/PaymentService.js](server/services/PaymentService.js) | Razorpay integration |
| [src/pages/steps/Step5Checkout.jsx](src/pages/steps/Step5Checkout.jsx) | Payment checkout |

## API Endpoints

**Auth:**
- POST `/api/auth/register` - Create account
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get profile

**Products:**
- GET `/api/products/tech` - Solar technologies
- GET `/api/products/panels` - Panels
- GET `/api/products/inverters` - Inverters
- GET `/api/products/bos` - BOS kit

**Orders:**
- POST `/api/orders` - Create order
- POST `/api/orders/create-payment` - Initiate Razorpay
- POST `/api/orders/verify-payment` - Verify payment
- GET `/api/orders` - List user's orders

## Troubleshooting

| Issue | Fix |
|-------|-----|
| MongoDB not connecting | Run `mongosh` in another terminal |
| CORS error | Check FRONTEND_URL in server/.env |
| Razorpay not opening | Check browser console, verify KEY_ID in .env |
| Port in use | Change PORT in server/.env or kill existing process |

## Documentation

- [README.md](README.md) - Full setup guide
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
- [DEVELOPMENT.md](DEVELOPMENT.md) - Developer guide
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Production checklist
- [BUILD_SUMMARY.md](BUILD_SUMMARY.md) - What's built

## Deploy to Production

1. Get Razorpay live keys
2. Update server/.env with production values
3. Switch MONGO_URI to MongoDB Atlas
4. Set NODE_ENV=production
5. Deploy to Railway/Heroku/AWS
6. See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for details

---

**Everything is ready. Start building! 🎉**
