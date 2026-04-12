# Samrat Solar - Customer Order Management & Solar Configurator Platform

A complete full-stack web application for customers to configure, customize, and order solar systems online. Includes user authentication, interactive product selection, real-time pricing, and integrated Razorpay payment processing.

## 🎯 Features

### Customer Features
- **User Registration & Login**: Secure JWT-based authentication
- **Interactive Solar Configurator**: 5-step guided configuration flow
  - Step 1: Select solar panel technology (HJT, N-Type TOPCon, PERC)
  - Step 2: Configure panel wattage and quantity
  - Step 3: Select inverter capacity (3kW, 5kW)
  - Step 4: View pre-configured Balance of System (BOS) kit
  - Step 5: Complete checkout with address and payment details
- **Real-Time Pricing**: Automatic calculation of panels, inverter, and BOS costs with GST
- **Two Payment Methods**:
  - Pay on Delivery (COD): Cash/Cheque at installation
  - Online Payment: Razorpay integration for UPI, cards, and wallets
- **Order Confirmation**: Instant order ID and financial summary

### Admin/Business Features
- **Product Management**: Multiple solar technologies and panels in database
- **Order Tracking**: Complete order history with payment status
- **Payment Verification**: Server-side secure Razorpay payment verification

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite
- **CSS3** (custom variables, grid, flexbox)
- **Fetch API** for backend communication
- **Context API** for state management

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Razorpay** for payment processing
- **bcryptjs** for password hashing
- **Helmet** for security headers
- **Express Rate Limiting** for DDoS protection

## 📋 Prerequisites

- **Node.js** v16+ and npm
- **MongoDB** (local or Atlas cloud)
- **Razorpay Account** (for payment testing/production)

## 🚀 Quick Start (Development)

### 1. Clone & Setup

```bash
cd c:\Users\hites\OneDrive\Desktop\prj
npm install
cd server
npm install
```

### 2. Configure Environment

```bash
# In server/ directory
cp .env.example .env
```

Edit `server/.env`:
```env
MONGO_URI=mongodb://localhost:27017/samrat_solar
JWT_SECRET=your_super_secret_key  # Change this!
RAZORPAY_KEY_ID=rzp_test_xxxxx     # Get from Razorpay dashboard
RAZORPAY_KEY_SECRET=xxxxx           # Get from Razorpay dashboard
FRONTEND_URL=http://localhost:5173
```

### 3. Seed Database (One-time)

```bash
cd server
npm run seed
```

This creates demo user:
- **Email**: demo@samratsolar.com
- **Password**: solar123

### 4. Start Backend

```bash
# In server/ directory
npm run dev
# Server runs on http://localhost:5000
```

### 5. Start Frontend

```bash
# In root directory (new terminal)
npm run dev
# Frontend runs on http://localhost:5173
```

### 6. Test the Flow

1. Open http://localhost:5173 in browser
2. Register or login with demo credentials
3. Configure system (select tech → panels → inverter → BOS)
4. Checkout:
   - **COD**: Just place order
   - **Online**: Opens Razorpay test environment
5. For Razorpay testing, use test card:
   - **Card**: 4111 1111 1111 1111
   - **Expiry**: 12/25
   - **CVV**: 123

## 📦 Project Structure

```
prj/
├── src/                          # Frontend React app
│   ├── pages/
│   │   ├── LoginPage.jsx        # Auth UI
│   │   ├── ConfiguratorPage.jsx # Main 5-step flow
│   │   ├── SuccessPage.jsx      # Order confirmation
│   │   └── steps/               # Individual configuration steps
│   ├── components/              # Reusable UI components
│   ├── context/
│   │   └── AppContext.jsx       # Global state management
│   ├── services/
│   │   └── api.js               # Backend API client
│   ├── data/
│   │   └── constants.js         # Fallback product data
│   └── index.css, main.jsx
├── server/                       # Express backend
│   ├── routes/
│   │   ├── auth.js              # Login, register, profile
│   │   ├── orders.js            # Order CRUD + Razorpay
│   │   └── products.js          # Product listing
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Product.js           # Product schema
│   │   └── Order.js             # Order schema
│   ├── middleware/
│   │   └── auth.js              # JWT verification
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── services/
│   │   └── PaymentService.js    # Razorpay integration
│   ├── index.js                 # Express app setup
│   ├── package.json
│   ├── .env                     # Environment variables
│   └── .env.example             # Template
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔒 Security Features

- ✅ **Password Hashing**: bcryptjs with salt rounds
- ✅ **JWT Authentication**: 7-day token expiry
- ✅ **CORS Protection**: Restricted to frontend domain only
- ✅ **Rate Limiting**: 100 requests per 15 minutes per IP
- ✅ **Security Headers**: Helmet.js
- ✅ **Input Validation**: Phone, pincode, required fields
- ✅ **Server-Side Verification**: Payment amounts recalculated from database
- ✅ **Razorpay Signature Verification**: HMAC-SHA256 validation

## 💳 Payment Integration (Razorpay)

### Test Mode Setup

1. Create free account at https://razorpay.com
2. Enable Test Mode in dashboard
3. Copy Test Key ID and Key Secret to `.env`
4. Use test cards (4111 1111 1111 1111)

### Payment Flow

1. **Frontend**: Customer selects online payment and enters address
2. **Backend**: API creates Razorpay order with amount in paise
3. **Frontend**: Opens Razorpay Checkout modal with encrypted details
4. **Customer**: Completes payment in Razorpay UI
5. **Frontend**: Gets payment response with signature
6. **Backend**: Verifies signature using HMAC-SHA256
7. **Database**: Updates order with payment status = "paid"
8. **Frontend**: Shows success page with order ID

### Switching to Production

1. Get Live Keys from Razorpay dashboard
2. Update `.env` with Live Key ID and Secret
3. Change `NODE_ENV=production`
4. Test with small amounts first

## 📊 Database Schema

### Users
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  createdAt: Date
}
```

### Products
```javascript
{
  type: ['tech', 'panel', 'inverter', 'bos'],
  name, img, price, mrp,
  // ... type-specific fields
  createdAt: Date
}
```

### Orders
```javascript
{
  orderId: String (unique),
  user: ObjectId (ref: User),
  tech: { id, name },
  panels: [{ wp, name, qty, pricePerUnit, total }],
  inverter: { kw, name, price },
  bosPrice: Number,
  subtotal, gst, total: Numbers,
  paymentMethod: ['cod', 'online'],
  paymentStatus: ['pending', 'paid', 'failed', 'refunded'],
  paymentGateway: 'razorpay',
  razorpayOrderId, razorpayPaymentId, razorpaySignature: Strings,
  status: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
  address: { name, phone, address, city, state, pin, landmark },
  paidAt: Date,
  createdAt, updatedAt: Dates
}
```

## 🧪 API Endpoints

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login & get JWT token
- `GET /api/auth/me` - Get current user (requires auth)

### Products
- `GET /api/products/tech` - List solar technologies
- `GET /api/products/panels` - List solar panels
- `GET /api/products/inverters` - List inverters
- `GET /api/products/bos` - List BOS components

### Orders
- `POST /api/orders` - Create order (COD or online with pending payment)
- `POST /api/orders/create-payment` - Initiate Razorpay payment
- `POST /api/orders/verify-payment` - Verify Razorpay signature & confirm payment
- `GET /api/orders` - List user's orders
- `GET /api/orders/:id` - Get order details

## 🚢 Deployment Guide

### MongoDB Atlas Setup (Recommended)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/samrat_solar`
4. Update `.env` with Atlas URI

### Backend Deployment (Heroku/Railway/Render)

**Using Railway (Recommended for beginners)**

1. Push code to GitHub
2. Connect repository at railway.app
3. Add environment variables in dashboard:
   ```
   MONGO_URI=your_atlas_uri
   JWT_SECRET=strong_random_string
   RAZORPAY_KEY_ID=live_key
   RAZORPAY_KEY_SECRET=live_secret
   FRONTEND_URL=your_frontend_domain.com
   NODE_ENV=production
   ```
4. Deploy!

**Using Heroku**

```bash
cd server
heroku login
heroku create your-app-name
heroku config:set MONGO_URI=your_atlas_uri
heroku config:set JWT_SECRET=your_secret
# ... set other env vars
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)

**Using Vercel**

1. Push code to GitHub
2. Import project at vercel.com
3. In environment variables, update API base URL (production backend)
4. Deploy!

Then update `vite.config.js` proxy target if needed for prod.

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Check if MongoDB is running: mongosh
If using Atlas, check IP whitelist in Security > Network Access
```

### Payment Not Working in Checkout
```
1. Verify RAZORPAY_KEY_ID is set (test or live keys)
2. Check browser console for Razorpay script load errors
3. Clear browser cache
4. Try test card: 4111 1111 1111 1111
```

### CORS Errors
```
Check FRONTEND_URL in .env matches your frontend domain exactly
```

### Port Already in Use
```bash
# Change PORT in .env, or kill existing process:
# On Windows: netstat -ano | findstr :5000
lsof -i :5000  # macOS/Linux
kill -9 <PID>
```

## 📝 Next Steps (Future Enhancements)

- [ ] Admin dashboard for order management
- [ ] Email notifications for order confirmation
- [ ] Order tracking with push notifications
- [ ] Installment payment options
- [ ] Referral program
- [ ] Customer reviews and ratings
- [ ] Installation engineer mobile app
- [ ] Performance monitoring dashboard
- [ ] Automated invoice generation
- [ ] Integration with accounting software

## 📞 Support

For issues or questions:
1. Check MongoDB and server console logs
2. Verify all `.env` variables are set correctly
3. Test API endpoints with Postman/Insomnia
4. Check browser developer console for frontend errors

## 📄 License

This project is for demonstration purposes. Modify as needed for your business.

---

**Built with ❤️ for Samrat Solar**
