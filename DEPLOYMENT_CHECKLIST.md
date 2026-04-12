# Deployment Checklist - Samrat Solar Platform

Before deploying to production, ensure all items below are completed.

## 🔒 Security Checklist

- [ ] **Update .env secrets**
  - [ ] Change JWT_SECRET to a strong random string (use: `openssl rand -base64 32`)
  - [ ] Add RAZORPAY_KEY_ID (Live Key, not test)
  - [ ] Add RAZORPAY_KEY_SECRET (Live Key, not test)
  - [ ] Set RAZORPAY_WEBHOOK_SECRET
  - [ ] Update FRONTEND_URL to production domain
  - [ ] Set NODE_ENV=production

- [ ] **Database Security**
  - [ ] Use MongoDB Atlas (not local MongoDB)
  - [ ] Enable IP whitelist in MongoDB Atlas
  - [ ] Create database-specific user (not admin user)
  - [ ] Enable encryption at rest
  - [ ] Enable automatic backups

- [ ] **Backend Security**
  - [ ] Enable HTTPS/SSL certificates
  - [ ] Set secure CORS origin (not *)
  - [ ] Rate limiting enabled (99 req/15min in .env if customized)
  - [ ] Helmet.js enabled (checking server/index.js)
  - [ ] Input validation on all endpoints
  - [ ] Remove console.log statements in production code

- [ ] **Payment Security**
  - [ ] Razorpay signature verification enabled
  - [ ] All payment amounts computed server-side (not from client)
  - [ ] Webhooks configured in Razorpay dashboard
  - [ ] Refund handling implemented

- [ ] **API Security**
  - [ ] JWT tokens have expiration (7 days)
  - [ ] Refresh token mechanism (if needed)
  - [ ] Request body size limited (10kb)
  - [ ] SQL/NoSQL injection prevention (Mongoose handles this)

## 📋 Code Quality Checklist

- [ ] No hardcoded credentials in code
- [ ] No console.logs in production (server/*.js)
- [ ] Error messages don't leak sensitive info
- [ ] Frontend API calls use HTTPS only in production
- [ ] No console errors in browser dev tools
- [ ] All required field validation present

## 🗄️ Database Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database name: `samrat_solar` (or your choice)
- [ ] Collections exist: users, products, orders
- [ ] Indexes created:
  - [ ] users: email (unique)
  - [ ] orders: user + createdAt (for user's orders list)
  - [ ] orders: orderId (unique)
- [ ] Seed data loaded (products, demo user optional)
- [ ] Backup configured
- [ ] Connection string added to .env

## 🚀 Deployment Platform Checklist

### Option 1: Railway.app (Recommended for beginners)
- [ ] Create free Railway account
- [ ] Connect GitHub repository
- [ ] Create Postgres/MongoDB service
- [ ] Add environment variables to Railway dashboard
- [ ] Deploy!

### Option 2: Heroku
- [ ] Create Heroku account
- [ ] Install Heroku CLI
- [ ] `heroku create samrat-solar-backend`
- [ ] `heroku config:set VAR=value` (set all .env vars)
- [ ] `git push heroku main`

### Option 3: AWS/GCP/Azure
- [ ] Set up VM instance (EC2/Compute Engine/etc)
- [ ] Install Node.js and MongoDB on instance
- [ ] Clone repo, install deps, configure .env
- [ ] Use PM2/systemd for process management
- [ ] Set up SSL with Let's Encrypt
- [ ] Configure domain DNS

## 🌐 Frontend Deployment Checklist

### Option 1: Vercel (Recommended)
- [ ] Push code to GitHub
- [ ] Connect GitHub repo to Vercel
- [ ] Set build command: `npm run build`
- [ ] Set output directory: `dist`
- [ ] In environment variables: `VITE_API_URL=https://your-backend-domain.com/api`
- [ ] Deploy!

### Option 2: Netlify
- [ ] Push code to GitHub
- [ ] Connect GitHub repo to Netlify
- [ ] Set build command: `npm run build`
- [ ] Set publish directory: `dist`
- [ ] Configure redirects in netlify.toml for SPA
- [ ] Deploy!

### Option 3: Own Server
- [ ] `npm run build` locally
- [ ] Upload `dist/` folder to web server
- [ ] Configure web server (nginx/apache) as reverse proxy to backend
- [ ] Set up SSL certificate

## 📊 Monitoring & Logging Checklist

- [ ] Error tracking enabled (Sentry, LogRocket, etc)
- [ ] Uptime monitoring configured
- [ ] Database backup verified
- [ ] Log aggregation service set up (CloudWatch, Datadog, etc)
- [ ] Alert system configured for critical errors

## 🧪 Testing Checklist

- [ ] User registration flow tested
- [ ] User login flow tested
- [ ] Complete configurator (5 steps) tested
- [ ] COD order placement tested
- [ ] Online payment with test Razorpay tested
- [ ] Order retrieval and history working
- [ ] Invalid inputs properly handled with error messages
- [ ] Response times acceptable (< 2 seconds)

## 📝 Documentation Checklist

- [ ] README.md is up-to-date
- [ ] API documentation complete (endpoint list, auth, errors)
- [ ] Setup instructions for new developers
- [ ] Known issues and limitations documented
- [ ] Troubleshooting guide included

## 🔄 Maintenance Checklist

- [ ] Backup strategy documented
- [ ] Disaster recovery plan created
- [ ] Update strategy for dependencies planned
- [ ] Security patch process defined
- [ ] Monitoring alerts set up
- [ ] Team training on deployment process

## Final Verification

- [ ] Test user registration on production
- [ ] Test user login on production
- [ ] Test complete order flow (COD)
- [ ] Test complete order flow (Online payment with test card)
- [ ] Verify database has the order
- [ ] Check error logs for any issues
- [ ] Load test with simulated traffic
- [ ] Test on mobile devices
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)

---

✅ All items complete? **You're ready to launch!**

For rollback procedure: Keep previous deployment tagged in git, can revert quickly if needed.
