# Implementation Details - Code References

## 📁 File Overview

### New Components Created

#### 1. CartContext.jsx
**Location**: `src/context/CartContext.jsx`
**Purpose**: Global cart state management using React Context API
**Key Features**:
- Persistent cart storage with localStorage
- Cart operations (add, remove, update quantity)
- Cart calculations (total price, item count)

**Main Exports**:
```javascript
export function CartProvider({ children })    // Wrapper component
export function useCart()                     // Hook to use cart anywhere
```

**Context Value Object**:
```javascript
{
  cartItems: Array<CartItem>,
  addToCart: (product) => void,
  removeFromCart: (productId) => void,
  updateQuantity: (productId, qty) => void,
  clearCart: () => void,
  getTotalPrice: () => number,
  getTotalItems: () => number,
  isInCart: (productId) => boolean,
  getCartItem: (productId) => CartItem | undefined
}
```

---

#### 2. HomePage.jsx
**Location**: `src/pages/HomePage.jsx`
**Purpose**: Landing page with hero section and featured products
**Sections**:
1. Navigation Bar (navbar-home class)
2. Hero Section with CTAs
3. Featured Products Grid
4. Why Choose Us Benefits
5. Call-to-Action Section
6. Footer

**Key Components**:
- `<Navbar>` - Top navigation with logo and menu
- `<Hero>` - Hero section with buttons
- `<FeaturedProducts>` - 3-card showcase
- `<BenefitGrid>` - 6 benefit cards
- `<CTA>` - Call-to-action section
- `<Footer>` - Company footer

**Navigation Integration**:
```javascript
const { setPage, user, logout } = useApp();

// Navigate on button click
onClick={() => setPage('home')}      // Home
onClick={() => setPage('products')}  // Shop
onClick={() => setPage('configurator')} // Configurator
onClick={() => setPage('cart')}      // Cart
onClick={logout}                     // Logout
```

---

#### 3. ShopPage.jsx
**Location**: `src/pages/ShopPage.jsx`
**Purpose**: Product catalog with filtering and cart integration
**Features**:
- Category filtering
- Product grid display
- Add to cart functionality
- Cart status indicators

**Key States & Hooks**:
```javascript
const { products } = useApp();                    // All products
const { addToCart, getCartItem } = useCart();     // Cart operations
const [filter, setFilter] = useState('all');      // Filter state
```

**Product Structure**:
```javascript
{
  id: string,
  name: string,
  category: string,
  price: number,
  specs: string[],
  warranty: string
}
```

**Category List**:
- all
- Modules
- Inverters
- Mounting Hardware
- Cables & Connectors
- Safety Equipment

---

#### 4. CartPage.jsx
**Location**: `src/pages/CartPage.jsx`
**Purpose**: Shopping cart display and management
**Sections**:
1. Cart Item List
2. Order Summary (sidebar)
3. Empty Cart State

**Cart Item Display**:
- Product image/icon
- Product details and specs
- Unit price
- Quantity controls (±, input)
- Item total
- Remove button

**Order Summary Shows**:
- Subtotal
- Shipping (free)
- Taxes (info)
- Total amount
- Action buttons (checkout, continue, clear)
- Benefits list

**Empty Cart State**:
- Shows when cartItems.length === 0
- Displays encouraging message
- Provides "Continue Shopping" button

---

### Modified Files

#### 1. App.jsx
**Changes**:
```javascript
// BEFORE
export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

// AFTER
export default function App() {
  return (
    <CartProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </CartProvider>
  );
}
```

**New Imports**:
```javascript
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
```

**New Routing**:
```javascript
function AppContent() {
  const { page, loading } = useApp();
  
  if (page === 'home') return <HomePage />;
  if (page === 'products') return <ShopPage />;
  if (page === 'cart') return <CartPage />;
  // ... other pages
}
```

---

#### 2. AppContext.jsx
**Changes**:

##### A. Initial Page State
```javascript
// BEFORE
const [page, setPage] = useState('login');

// AFTER
const [page, setPage] = useState(hasToken() ? 'home' : 'login');
```

##### B. New Products Array
```javascript
// Added state
const [products, setProducts] = useState([]);

// New useEffect to combine panels and inverters
useEffect(() => {
  const combinedProducts = [
    ...panelProducts.map(p => ({
      id: `panel-${p.wp}`,
      name: p.name,
      category: 'Modules',
      price: p.price,
      specs: [p.model, `${p.wp}W`],
      warranty: '25 Year Warranty'
    })),
    ...inverterProducts.map(i => ({
      id: `inverter-${i.kw}`,
      name: i.name,
      category: 'Inverters',
      price: i.price,
      specs: [i.brand, `${i.kw}kW`],
      warranty: '5 Year Warranty'
    }))
  ];
  setProducts(combinedProducts);
}, [panelProducts, inverterProducts]);
```

##### C. Enhanced Registration Validation
```javascript
// BEFORE - Minimal validation
const register = useCallback(async () => {
  if (!registerName.trim()) {
    setLoginErr('Name is required.');
    return;
  }
  const data = await apiRegister(...);
  // ...
}, [registerName, loginEmail, loginPass, registerPhone]);

// AFTER - Comprehensive validation
const register = useCallback(async () => {
  // 1. Name check
  if (!registerName.trim()) {
    setLoginErr('Name is required.');
    return;
  }
  
  // 2. Email check
  if (!loginEmail.trim()) {
    setLoginErr('Email is required.');
    return;
  }
  
  // 3. Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(loginEmail)) {
    setLoginErr('Please enter a valid email address.');
    return;
  }
  
  // 4. Password strength check
  if (!loginPass || loginPass.length < 6) {
    setLoginErr('Password must be at least 6 characters long.');
    return;
  }
  
  // 5. Phone validation
  if (!registerPhone.trim() || registerPhone.length < 10) {
    setLoginErr('Phone number must be at least 10 digits.');
    return;
  }
  
  // Clear form and navigate on success
  const data = await apiRegister(...);
  setPage('home');
  setLoginMode('login');
  setLoginEmail('');
  setLoginPass('');
  setRegisterName('');
  setRegisterPhone('');
}, [registerName, loginEmail, loginPass, registerPhone]);
```

##### D. Context Value Updated
```javascript
// Added to context value object
products,                    // New products array
setPage, setStep, ...

// In useMemo dependencies
techProducts, panelProducts, inverterProducts, bosProducts, bosPrice, products,
```

---

#### 3. index.css
**Changes**: Added 400+ lines of new styles

**New CSS Class Groups**:
1. `.navbar-home` - New navigation styles
2. `.hero-home` - Home page hero
3. `.featured-*` - Featured products cards
4. `.why-*` - Benefits section
5. `.cta-section` - Call-to-action
6. `.footer` - Footer styles
7. `.shop-page` - Shop page layout
8. `.filter-*` - Filter buttons
9. `.products-*` - Product grid
10. `.product-card-shop` - Shop product cards
11. `.shop-info` - Shop benefit info
12. `.cart-page` - Cart layout
13. `.empty-cart` - Empty cart state
14. `.cart-container` - Cart grid layout
15. `.cart-items` - Items list
16. `.cart-item` - Individual item
17. `.cart-summary` - Sidebar summary
18. `.responsive` - Media queries

**Key Breakpoints**:
- Desktop: 1920px (full layout)
- Tablet: 900px (2-column to 1-column)
- Mobile: 768px (stack everything)

---

## 🔗 Integration Points

### Context API Flow
```
CartProvider (context)
├── Provides: useCart() hook
└── Used by: ShopPage, CartPage

AppProvider (context)
├── Provides: useApp() hook
└── Used by: HomePage, ShopPage, CartPage, LoginPage, ConfiguratorPage
```

### Data Flow - Adding to Cart
```
ShopPage Component
  └── User clicks "Add to Cart"
      └── Calls addToCart(product)
          └── CartContext updates state
              └── localStorage synced
                  └── Cart count in navbar updates
                      └── Product shows "In Cart" badge
```

### Data Flow - Checkout
```
CartPage Component
  └── User clicks "Proceed to Checkout"
      └── setPage('configurator')
          └── Shows ConfiguratorPage
              └── Can select options OR use cart items
                  └── Click "Place Order"
                      └── POST to /api/orders with cart items
                          └── Success → SuccessPage
```

---

## 🎨 CSS Architecture

### Color Variables
```css
:root {
  --red: #C0392B;           /* Primary action */
  --gold: #F39C12;          /* Accents */
  --dark: #1A1A2E;          /* Text */
  --gray-50: #F8F9FA;       /* Light background */
  --green: #1E8449;         /* Success */
}
```

### Typography System
```css
Headings: 'Rajdhani', sans-serif
  - H1: 2.8rem (hero)
  - H2: 2.0rem (sections)
  - H3: 1.2rem (cards)
  - H4: 1.0rem (sub-sections)

Body: 'Inter', sans-serif
  - Body: 14px / 16px
  - Small: 12px / 13px
  - Tiny: 10px / 11px
```

### Components Library
```css
Buttons:
  .btn-primary    - Red background, white text
  .btn-secondary  - Transparent, white border
  .btn-add-cart   - Cart action
  .btn-remove     - Remove action

Cards:
  .featured-card  - Product showcase
  .product-card-shop - Shop product
  .cart-item      - Cart row
  .why-card       - Benefit card

Forms:
  .fi             - Input field (with focus state)
  .qty-input      - Quantity input
  .filter-btn     - Category filter
```

---

## 🔄 Component Communication

### React Component Tree
```
App
├── CartProvider
│   └── AppProvider
│       └── AppContent
│           ├── LoginPage
│           ├── HomePage
│           │   ├── Navbar
│           │   ├── Hero
│           │   ├── Featured Products
│           │   ├── Benefits
│           │   ├── CTA
│           │   └── Footer
│           ├── ShopPage
│           │   ├── Filter buttons
│           │   └── Product grid
│           ├── CartPage
│           │   ├── Cart items list
│           │   └── Order summary
│           ├── ConfiguratorPage
│           └── SuccessPage
```

### Hook Usage
```javascript
// In any component
const { page, setPage, user, logout } = useApp();          // App context
const { cartItems, addToCart, getTotalPrice } = useCart();  // Cart context
```

---

## 📊 Data Structures

### CartItem Structure
```javascript
{
  id: "panel-560",
  name: "Mono PERC Module",
  price: 18000,
  quantity: 2,
  category: "Modules",
  specs: ["Model-123", "560W"],
  warranty: "25 Year Warranty"
}
```

### Product Structure (from DB)
```javascript
// Panel Product
{
  wp: 560,
  name: "Mono PERC Module - 560W",
  model: "Model-123",
  price: 18000,
  mrp: 20000,
  specs: ["Mono PERC", "25Y Warranty"]
}

// Inverter Product
{
  kw: 3,
  name: "3kW Hybrid Inverter",
  brand: "Brand-X",
  price: 45000,
  specs: ["MPPT Charge", "WiFi Monitor"]
}
```

---

## 🚀 Deployment Considerations

### Environment Variables
```env
# Backend (.env)
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173
```

### Build Process
```bash
# Frontend
npm.cmd run build        # Creates dist/ folder
npm.cmd run preview     # Test build locally

# Backend
npm.cmd start           # Runs with node (after install)
```

### Production Checklist
- [ ] Environment variables set correctly
- [ ] API CORS origin updated to production domain
- [ ] Database indexes created
- [ ] Razorpay keys updated (production keys)
- [ ] SSL certificate installed
- [ ] Rate limiting configured
- [ ] Error logging enabled
- [ ] Backups scheduled

---

## 🐛 Debugging Tips

### Check Cart State
```javascript
// In browser console
localStorage.getItem('cart')  // See cart JSON
JSON.parse(localStorage.getItem('cart'))  // See parsed
```

### Check App State
```javascript
// Add to any component to debug
useEffect(() => {
  console.log('Current page:', page);
  console.log('User:', user);
  console.log('Cart items:', cartItems);
}, [page, user, cartItems]);
```

### API Debugging
```javascript
// Check network requests in DevTools
// Network tab → Filter by "XHR/Fetch"
// Look for /api/* requests
```

---

This document serves as a technical reference for the codebase implementation.
