# Admin Panel Documentation

## 🎯 Overview
The Samrat Solar admin panel provides complete management of products, users, and orders with real-time analytics.

## 🔐 Admin Credentials

**Email:** `admin@samratsolar.com`
**Password:** `admin123`

> These credentials are seeded in the database. Change them after first login!

## 🚀 Getting Started

### Access Admin Panel
1. Add `/admin` to main user login page, or navigate directly to admin login
2. Use the credentials above
3. You'll be redirected to the admin dashboard

### Accessing the Admin Panel
The admin panel is **separate from the user application**. When you login with admin credentials:
- Token is stored in `adminToken` (separate from user `token`)
- App automatically detects admin token and shows admin interface
- Admin users cannot access the configurator/shop

## 📊 Dashboard Features

### Dashboard Overview
- **Total Users:** Count of registered users (excluding admin)
- **Total Orders:** Count of all orders placed
- **Paid Orders:** Count of orders with payment completed
- **Total Revenue:** Sum of all paid orders

### Recent Orders Table
View the 10 most recent orders with:
- Order ID
- Customer name & email
- Order total
- Order status
- Payment status

## 📦 Product Management

### Features
- ✅ View all products (organized by type)
- ✅ Add new products
- ✅ Edit existing products
- ✅ Delete products
- ✅ Filter by type (Tech, Panel, Inverter, BOS)

### Product Types

#### 1. **Technology** (Solar Modules)
- Fields: techId, name, short, badge, eff, cells, power, warranty, temp, desc, feats, price, mrp

#### 2. **Panel** (Solar Panels)
- Fields: wp (wattage), name, model, cells, voc, isc, price, mrp

#### 3. **Inverter**
- Fields: kw (capacity), name, model, brand, specs, price, mrp

#### 4. **BOS** (Balance of System)
- Fields: icon, name, sub (sub-category)

### Adding a Product
1. Click "➕ Add Product"
2. Select product type
3. Fill in required fields (marked with *)
4. Click "➕ Create"

### Editing a Product
1. Click ✏️ icon next to product
2. Update fields
3. Click "💾 Update"

### Deleting a Product
1. Click 🗑️ icon
2. Confirm deletion
3. Product is removed

## 👥 User Management

### Features
- ✅ View all registered users
- ✅ Search by name or email
- ✅ View user details & purchase history
- ✅ Update user information
- ✅ Delete users (only if no orders)

### User Information Displayed
- Name & Email
- Phone number
- Total orders placed
- Total amount spent
- Registration date

### View User Details
1. Click 👁️ icon next to user
2. See full user information
3. View total orders and spending

## 📋 Order Management

### Features
- ✅ View all orders with customer details
- ✅ Update order status
- ✅ Update payment status
- ✅ View complete order details
- ✅ Filter by status and payment method

### Order Status Options
- **Pending:** Order created, payment pending (online orders only)
- **Confirmed:** Order confirmed, ready for processing
- **Processing:** Order is being prepared
- **Shipped:** Order dispatched
- **Delivered:** Order delivered to customer
- **Cancelled:** Order cancelled

### Payment Status Options
- **Pending:** Waiting for payment
- **Paid:** Payment received
- **Failed:** Payment failed

### Viewing Order Details
Click 👁️ to see:
- Customer info (name, email, phone)
- Delivery address
- Product items & quantities
- Inverter & BOS details
- Complete pricing breakdown
- Razorpay payment IDs (if online payment)

## 📈 Analytics

### Future Features
- Monthly revenue trends
- Payment method breakdown
- Product sales analytics
- Customer acquisition metrics

*Coming soon in the analytics section*

## 🔧 Backend Admin APIs

All admin endpoints require JWT token with `admin` role in Authorization header.

### Dashboard Stats
```
GET /api/admin/dashboard/stats
Response: { stats: {...}, recentOrders: [...] }
```

### Product Management
```
GET /api/admin/products                    # List all products
POST /api/admin/products                   # Create product
PUT /api/admin/products/:id                # Update product
DELETE /api/admin/products/:id             # Delete product
```

### User Management
```
GET /api/admin/users                       # List all users
GET /api/admin/users/:id                   # Get user details & orders
PUT /api/admin/users/:id                   # Update user
DELETE /api/admin/users/:id                # Delete user (if no orders)
```

### Order Management
```
GET /api/admin/orders                      # List all orders
GET /api/admin/orders/:id                  # Get order details
PUT /api/admin/orders/:id                  # Update order status & payment
```

### Analytics
```
GET /api/admin/analytics/revenue           # Revenue trends & breakdown
```

## 🛡️ Security Notes

1. **Admin Authentication:**
   - Admin token stored separately in localStorage
   - JWT with 7-day expiration
   - Admin role enforced on all endpoints

2. **Admin Middleware:**
   - All admin routes protected by `adminAuth` middleware
   - Returns 403 if user is not admin

3. **Data Validation:**
   - Price tampering prevented (server calculates totals)
   - Phone & pincode format validation
   - Email uniqueness enforced

4. **Best Practices:**
   - Change default admin password immediately
   - Use strong passwords
   - Logout when done
   - Only give admin access to trusted staff

## 🆘 Troubleshooting

### Can't Login as Admin
- Verify credentials: `admin@samratsolar.com` / `admin123`
- Check if seed script was run: `npm run seed` (from server folder)
- Ensure JWT_SECRET is set in .env

### Admin UI Not Loading
- Check browser console for errors
- Verify admin token is in localStorage
- Clear cache and try again
- Ensure backend admin routes are mounted

### Products Not Showing
- Run seed script to populate initial data
- Check MongoDB connection
- Verify product documents exist in database

### Payment Status Won't Update
- Verify order exists
- Check admin permissions
- Confirm payment status value is valid (pending/paid/failed)

## 📝 Admin User Model

```javascript
User Schema:
- name: String (required)
- email: String (unique, required)
- password: String (hashed)
- phone: String
- role: String (enum: 'user', 'admin') ← Key field
- createdAt, updatedAt: Timestamps
```

## 🚀 Production Checklist

Before going live:
- [ ] Change admin password from default
- [ ] Configure email notifications for orders
- [ ] Set up order confirmation webhooks
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set strong JWT_SECRET
- [ ] Enable rate limiting
- [ ] Set up database backups
- [ ] Configure payment gateway keys
- [ ] Test all admin operations

## 📞 Support

For issues or feature requests, contact development team or check the API documentation.
