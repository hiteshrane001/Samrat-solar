# Development Guide - Samrat Solar Platform

This guide is for developers who want to contribute to or extend the Samrat Solar platform.

## Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd prj
npm install
cd server
npm install
cd ..
```

### 2. Setup Local Environment
```bash
# Copy environment template
cp server/.env.example server/.env

# Edit server/.env and add:
# - MONGO_URI: mongodb://localhost:27017/samrat_solar
# - JWT_SECRET: any random string for development
# - RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET: Use test keys from Razorpay dashboard
```

### 3. Setup MongoDB Locally
```bash
# Install MongoDB Community Edition
# macOS: brew install mongodb-community
# Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
# Linux: https://docs.mongodb.com/manual/installation/

# Start MongoDB
mongod  # or 'brew services start mongodb-community' on macOS

# In another terminal, seed the database
cd server
npm run seed
```

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev  # Runs with --watch mode
```

**Terminal 2 - Frontend:**
```bash
npm run dev  # Starts Vite dev server on localhost:5173
```

## Project Architecture

### Frontend (React + Vite)

```
src/
├── main.jsx                 # App entry point
├── App.jsx                  # Main routing wrapper
├── index.css               # Global styles + CSS variables
├── pages/
│   ├── LoginPage.jsx       # Authentication UI
│   ├── ConfiguratorPage.jsx # Main app wrapper
│   ├── SuccessPage.jsx     # Order confirmation
│   └── steps/              # 5-step configurator pages
│       ├── Step1Technology.jsx
│       ├── Step2Panels.jsx
│       ├── Step3Inverter.jsx
│       ├── Step4BOS.jsx
│       └── Step5Checkout.jsx
├── components/             # Reusable UI components
├── context/
│   └── AppContext.jsx      # Redux-like state management
├── services/
│   └── api.js              # API client methods
└── data/
    └── constants.js        # Fallback product data & utilities
```

**Key State Variables (in AppContext.jsx):**
- `page`: Current page (login, configurator, success)
- `step`: Current configurator step (1-5)
- `tech`: Selected technology ID
- `qty`: Panel quantities by wattage
- `inverter`: Selected inverter capacity in kW
- `pay`: Payment method (cod, online)
- `addr`: Delivery address object
- `user`: Logged-in user data

**Key Functions:**
- `login()`, `register()`, `logout()`: Auth
- `setTech()`, `updateQty()`, `setInverter()`, `setPay()`: Configuration
- `placeOrder()`: Submit order and trigger payment
- Utility functions: `subtotal()`, `total()`, `fmt()`, etc.

### Backend (Express + MongoDB)

```
server/
├── index.js               # Express app setup, middleware
├── routes/
│   ├── auth.js            # /api/auth/* endpoints
│   ├── products.js        # /api/products/* endpoints
│   └── orders.js          # /api/orders/* endpoints
├── models/
│   ├── User.js            # User schema with password hashing
│   ├── Product.js         # Product catalog schema
│   └── Order.js           # Order & payment status schema
├── middleware/
│   └── auth.js            # JWT verification middleware
├── config/
│   └── db.js              # MongoDB connection
├── services/
│   └── PaymentService.js  # Razorpay integration
├── .env                   # Environment variables (don't commit)
├── .env.example           # Template (commit this)
└── seed.js                # Database seeding script
```

**Middleware Stack:**
1. Helmet - Security headers
2. CORS - Cross-origin requests
3. Rate Limiting - DDoS protection
4. Body Parser - JSON parsing
5. Auth Middleware - JWT verification on protected routes

**API Response Pattern:**
```javascript
// Success
{ order: {...}, message: "Order placed" }

// Error
{ message: "Error description" }
```

## Development Workflows

### Adding a New Product Type

1. **Backend (server/models/Product.js)**
   - Add fields for new product type
   - Document the schema

2. **Seed Data (server/seed.js)**
   - Add sample products

3. **Backend Route (server/routes/products.js)**
   - Add GET endpoint for new type

4. **Frontend API (src/services/api.js)**
   - Add fetch function

5. **Frontend Components (src/pages/steps/)**
   - Create new step component
   - Add to ConfiguratorPage

### Adding a New Payment Gateway

1. **PaymentService.js**
   - Add gateway-specific functions

2. **Order Model**
   - Add payment gateway field

3. **Orders Route**
   - Add create-payment endpoint
   - Add verify-payment endpoint

4. **Frontend**
   - Update PaymentSelector component
   - Update Step5Checkout for new gateway

### Adding User Profile Page

1. **Frontend Component (src/pages/)**
   - Create ProfilePage.jsx
   - Show user orders, address, preferences

2. **Backend Route (server/routes/auth.js)**
   - Add PUT /api/auth/profile endpoint
   - Update user profile fields

3. **Context (src/context/AppContext.jsx)**
   - Add profile state variables
   - Add update functions

## Code Style & Best Practices

### Frontend (React)
```javascript
// ✅ Use functional components and hooks
// ✅ Use useCallback for prop functions
// ✅ Use useMemo for expensive computations
// ❌ Avoid state mutations - always create new objects
// ✅ Use Context for global state
// ❌ Avoid prop drilling - use Context instead
```

### Backend (Node/Express)
```javascript
// ✅ Use async/await
// ✅ Always verify user identity in protected routes
// ✅ Recalculate critical values server-side
// ✅ Use consistent error response format
// ❌ Never trust client-sent pricing data for payments
// ✅ Validate all user inputs
```

### Database (MongoDB)
```javascript
// ✅ Use indexes on frequently queried fields
// ✅ Store prices in paise (not rupees) for payments
// ✅ Use ObjectId for relationships
// ✅ Create unique constraints where needed
```

## Testing Scenarios

### User Flow Testing
- [ ] New user registration
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Complete all 5 configurator steps
- [ ] Logout and login again
- [ ] View order history

### Payment Testing
- [ ] COD order placement
- [ ] Online payment with test card (4111 1111 1111 1111)
- [ ] Signature verification on backend
- [ ] Invalid payment handling
- [ ] Refund processing

### Edge Cases
- [ ] Form submission with empty required fields
- [ ] Invalid email format
- [ ] Invalid phone number
- [ ] Duplicate email registration
- [ ] Expired JWT token
- [ ] Negative or zero quantities

## Debugging Tips

### Frontend Debugging
```javascript
// React DevTools extension
// Check Context values: DevTools → Components → AppContext

// Browser Console
// Check API requests: Network tab
// Check localStorage: Storage → localStorage

// Debug placeOrder flow:
console.log('Order placed:', orderRes);
console.log('Razorpay options:', options);
```

### Backend Debugging
```javascript
// Check logs in terminal running `npm run dev`
// MongoDB queries:
db.orders.find({}).pretty()
db.users.findOne({ email: "..." })

// Razorpay:
// Check Payment ID in Razorpay Dashboard
// Check signature in backend logs
```

### Common Issues

**"Cannot find module 'razorpay'"**
```bash
cd server
npm install razorpay
```

**"MongooseError: Operation `orders.insertOne()` buffering timed out"**
- Check if MongoDB is running
- Check MONGO_URI in .env

**"CORS error in browser console"**
- Check FRONTEND_URL in server/.env matches your domain
- Check vite.config.js proxy target

**"Razorpay checkout not opening"**
- Check RAZORPAY_KEY_ID in .env
- Check browser console for script load errors
- Clear browser cache

## Performance Optimization

### Frontend
- [ ] Code splitting for large components
- [ ] Lazy load images
- [ ] Minimize bundle size
- [ ] Use CSS variables effectively

### Backend
- [ ] Add database indexes
- [ ] Cache product data (Redis)
- [ ] Compress API responses (gzip)
- [ ] Rate limiting to prevent abuse

### Database
- [ ] Index frequently queried fields
- [ ] Archive old orders periodically
- [ ] Monitor slow queries

## Security Improvements (Future)

- [ ] Add two-factor authentication
- [ ] Implement refresh tokens
- [ ] Add request signing
- [ ] Email verification during registration
- [ ] Webhook signature verification for Razorpay
- [ ] DDoS mitigation with WAF
- [ ] SQL/NoSQL injection testing

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/add-reviews

# Make changes and test locally
# ... code ...

# Commit with clear message
git add .
git commit -m "feat: add product reviews"

# Push to repository
git push origin feature/add-reviews

# Create pull request on GitHub

# After review, merge to main
git checkout main
git pull origin main
git merge feature/add-reviews
git push origin main
```

## Commit Message Convention

Follow Conventional Commits:
```
feat: add user reviews feature
fix: correct payment amount calculation
docs: update API documentation
style: format code with Prettier
refactor: improve order validation logic
test: add tests for payment verification
chore: update dependencies
```

## Resources & Documentation

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Razorpay API Documentation](https://razorpay.com/docs)
- [Mongoose Documentation](https://mongoosejs.com)

---

Happy coding! 🚀
