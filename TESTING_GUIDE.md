# Quick Start Testing Guide

## 🎯 Test Your New Features

### Prerequisites
1. **Backend**: Running on `http://localhost:5000`
2. **Frontend**: Running on `http://localhost:5174` (or 5173)
3. **MongoDB**: Connected and seeded with products
4. **Browser**: Chrome, Firefox, Safari, or Edge

---

## 📝 Step-by-Step Testing

### PART 1: Registration & Login

#### Test 1.1 - Registration Form Validation
1. Open browser and go to `http://localhost:5174`
2. You should see **Login Page**
3. Click on **"Don't have an account? Register here"** link (or similar)
4. Try submitting with empty name:
   - **Expected**: Error message "Name is required."
5. Try submitting with invalid email (e.g., "notanemail"):
   - **Expected**: Error message "Please enter a valid email address."
6. Try submitting with short password (e.g., "123"):
   - **Expected**: Error message "Password must be at least 6 characters long."
7. Try submitting with short phone (e.g., "99999"):
   - **Expected**: Error message "Phone number must be at least 10 digits."

#### Test 1.2 - Successful Registration
1. Fill in all fields with valid data:
   ```
   Name: John Solar
   Email: john.solar@example.com
   Password: solar123
   Phone: 9876543210
   ```
2. Click "Register"
3. **Expected**: Account created, redirected to Home Page

---

### PART 2: Home Page

#### Test 2.1 - Home Page Layout
1. After login/registration, you should see **Home Page**
2. Verify the following sections exist:
   - ✅ Sticky Navigation Bar at top
   - ✅ Hero Section with title and buttons
   - ✅ Featured Products (3 cards)
   - ✅ Why Choose Us (6 benefit cards)
   - ✅ Call-to-Action section
   - ✅ Footer with company info

#### Test 2.2 - Navigation Bar
1. Check that nav bar shows:
   - ☀️ Logo with "Samrat Solar" text
   - Hover on logo: sun should rotate
2. Check nav links:
   - **Home** - stays on home
   - **Solar Modules** - goes to shop
   - **Configure System** - goes to configurator
   - **Inverters** - goes to shop (filtered)
   - **🛒 Cart** - shows cart (should be empty: 0 items)
   - **Login/Logout** - switches based on auth state

#### Test 2.3 - Hero Buttons
1. Click **"Start Configurator →"** button
   - **Expected**: Navigate to configurator page
2. Go back to home (click nav logo or Home link)
3. Click **"Explore Products"** button
   - **Expected**: Navigate to shop page

---

### PART 3: Shopping Cart

#### Test 3.1 - Browse Products
1. Navigate to **Shop** page (click "Solar Modules" in nav)
2. Verify you see:
   - ✅ Shop header with title
   - ✅ Category filter buttons
   - ✅ Product grid (should show 30+ products)
   - ✅ Each product shows name, specs, price, warranty

#### Test 3.2 - Filter Products
1. Click category filter **"Inverters"**
   - **Expected**: Only inverter products show
2. Click category filter **"Modules"**
   - **Expected**: Only solar module products show
3. Click category filter **"All"**
   - **Expected**: All products show again

#### Test 3.3 - Add to Cart
1. Find a module product (e.g., "Mono PERC 560W")
2. Click **"Add to Cart"** button
   - **Expected**: Button changes to show "✓ In Cart" status
   - **Expected**: Cart count in nav bar increases from 0 → 1
   - **Expected**: Shows "In Cart: 1x" and total price
3. Add another product (different type)
   - **Expected**: Cart count becomes 2
4. Add same product again:
   - **Expected**: Quantity increases (the same product shows "In Cart: 2x")

#### Test 3.4 - View Cart
1. Click **"🛒 Cart"** button in navigation
2. Verify cart page shows:
   - ✅ All added products listed
   - ✅ Unit price for each
   - ✅ Quantity controls (+, -, input)
   - ✅ Item total (price × qty)
   - ✅ Remove (✕) button for each item
   - ✅ Order Summary on the right
   - ✅ Total amount calculation
   - ✅ Proceed to Checkout button

#### Test 3.5 - Modify Cart
1. On cart page, find an item
2. Test quantity controls:
   - Click **"+"** button → qty increases
   - Click **"−"** button → qty decreases
   - Type directly in quantity input → updates
   - **Expected**: Total price updates automatically
3. Click **Remove (✕)** button on an item
   - **Expected**: Item removed from cart
   - **Expected**: Cart remains if other items exist
4. Continue until cart has 2-3 items

#### Test 3.6 - Empty Cart
1. While cart has items, click **"Clear Cart"** button
   - **Expected**: All items removed
   - **Expected**: Page shows "Your cart is empty"
2. Click **"Continue Shopping →"** button
   - **Expected**: Navigate back to shop

#### Test 3.7 - Cart Persistence
1. Add a few items to cart
2. Verify items show with correct quantities and prices
3. **Refresh the page** (F5 or Ctrl+R)
   - **Expected**: Cart items still there! (localStorage)
4. Click different nav links and come back
   - **Expected**: Cart still persists

---

### PART 4: Checkout & Orders

#### Test 4.1 - From Cart to Checkout
1. Go to shop page and add some products
2. Go to cart page
3. Click **"💳 Proceed to Checkout"** button
   - **Expected**: Navigate to Configurator/Checkout page
4. Fill in address details:
   ```
   Customer Name: John Solar
   Phone: 9876543210
   Address: 123 Solar Street
   City: Bangalore
   State: Karnataka
   Pincode: 560001
   Landmark: Near Solar Park
   ```
5. Select payment method:
   - **"Cash on Delivery (COD)"** - order placed immediately
   - **"Online Payment (Razorpay)"** - opens payment modal

#### Test 4.2 - Test Payment (Optional)
1. If you want to test Razorpay:
   - Make sure RAZORPAY_KEY_ID is in .env
   - Select "Online Payment"
   - Fill address
   - Click place order
   - **Expected**: Razorpay modal opens
   - Use test card: `4111111111111111` with any future expiry and any CVV
   - **Expected**: Payment succeeds → Success page

#### Test 4.3 - COD Order
1. Select "Cash on Delivery" payment
2. Click **"Place Order"** button
   - **Expected**: Order created in database
   - **Expected**: Success page displayed with order ID
   - **Expected**: Cart clears

---

### PART 5: Configurator (Existing Feature)

#### Test 5.1 - Access Configurator
1. From home page, click **"Start Configurator"**
   - **Expected**: 5-step process starts
2. Complete all 5 steps with your selections
3. In final checkout, add items to order
4. Select payment method and place order

---

## 🐛 Expected Test Results

### ✅ All Should Pass:
- [ ] Registration validation works
- [ ] Home page loads with all sections
- [ ] Navigation between pages works
- [ ] Products load from database
- [ ] Add to cart works
- [ ] Cart shows correct counts and prices
- [ ] Remove items from cart works
- [ ] Clear cart works
- [ ] Cart persists on page reload
- [ ] Checkout process works
- [ ] Orders save to database

### ⚠️ If You Find Issues:
1. **Products not showing**: Check MongoDB connection, seed data
2. **Cart not persisting**: Check browser settings (localStorage may be disabled)
3. **Navigation not working**: Clear browser cache, refresh page
4. **Styling issues**: Check CSS loaded, no conflicting styles
5. **Errors in console**: Share error message for debugging

---

## 📊 Test with Different Users

### Create Multiple Test Accounts:
```
User 1:
  Email: customer1@test.com
  Password: solar123
  Phone: 9876543210

User 2:
  Email: customer2@test.com
  Password: solar123
  Phone: 9876543211

User 3:
  Email: customer3@test.com
  Password: solar123
  Phone: 9876543212
```

### Each User Should:
- [ ] Have their own cart (independent localStorage)
- [ ] Be able to register
- [ ] Be able to login
- [ ] See their own orders
- [ ] Not see other users' data

---

## 📱 Responsive Design Testing

### Test on Different Screen Sizes:
1. **Desktop** (1920px): All layouts should work
2. **Tablet** (768px): Grid should adjust, nav should be compact
3. **Mobile** (375px): Single column layout, hamburger menu (future)

**To test in browser:**
- Press F12 to open DevTools
- Click device toggle icon
- Select different devices from dropdown

---

## 🔍 Browser Console Checks

**Things to verify in Browser Console (F12):**
1. No JavaScript errors (red messages)
2. Cart API calls should show GET requests to `/api/products/*`
3. Orders should POST to `/api/orders`
4. Auth should POST to `/api/auth/*`
5. All network requests should return 200 OK

**Common Issues:**
- CORS errors → Backend not running on 5000
- 404 errors → API endpoint doesn't exist
- Blank cart → localStorage issue

---

## 🎯 Success Criteria

Your platform is working correctly if:

✅ User can register with validation
✅ User can browse products
✅ User can add/remove items from cart  
✅ User can modify quantities
✅ Cart persists on page reload
✅ User can proceed to checkout
✅ Orders are created in database
✅ All pages load without errors
✅ Navigation works between all pages
✅ Design is responsive and modern

---

## 📞 Need Help?

If something doesn't work:
1. Check the browser console (F12) for error messages
2. Check backend terminal for API errors
3. Verify MongoDB is running: `mongod` or check Atlas
4. Verify both servers are running:
   - Backend: `npm.cmd start` (from server folder)
   - Frontend: `npm.cmd run dev` (from root folder)
5. Try clearing browser cache (Ctrl+Shift+Delete)
6. Try different browser (Firefox, Chrome, Edge)

---

**Happy Testing! 🚀**

Report any issues for debugging.
