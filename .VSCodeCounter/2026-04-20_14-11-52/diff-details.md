# Diff Details

Date : 2026-04-20 14:11:52

Directory c:\\Users\\hites\\OneDrive\\Desktop\\prj\\src

Total : 56 files,  2914 codes, 57 comments, 300 blanks, all 3271 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [server/config/db.js](/server/config/db.js) | JavaScript | -11 | 0 | -3 | -14 |
| [server/index.js](/server/index.js) | JavaScript | -61 | -10 | -15 | -86 |
| [server/middleware/adminAuth.js](/server/middleware/adminAuth.js) | JavaScript | -30 | 0 | -7 | -37 |
| [server/middleware/auth.js](/server/middleware/auth.js) | JavaScript | -27 | 0 | -6 | -33 |
| [server/models/Order.js](/server/models/Order.js) | JavaScript | -73 | 0 | -3 | -76 |
| [server/models/Product.js](/server/models/Product.js) | JavaScript | -43 | -7 | -9 | -59 |
| [server/models/User.js](/server/models/User.js) | JavaScript | -46 | 0 | -5 | -51 |
| [server/package-lock.json](/server/package-lock.json) | JSON | -1,482 | 0 | -1 | -1,483 |
| [server/package.json](/server/package.json) | JSON | -23 | 0 | -1 | -24 |
| [server/public/assets/index-B8QOdWPL.js](/server/public/assets/index-B8QOdWPL.js) | JavaScript | -1 | 0 | -1 | -2 |
| [server/public/assets/index-CnclcCYw.css](/server/public/assets/index-CnclcCYw.css) | PostCSS | -1 | 0 | -1 | -2 |
| [server/public/index.html](/server/public/index.html) | HTML | -14 | 0 | -1 | -15 |
| [server/routes/admin.js](/server/routes/admin.js) | JavaScript | -211 | -6 | -32 | -249 |
| [server/routes/auth.js](/server/routes/auth.js) | JavaScript | -60 | -3 | -16 | -79 |
| [server/routes/orders.js](/server/routes/orders.js) | JavaScript | -161 | -19 | -32 | -212 |
| [server/routes/products.js](/server/routes/products.js) | JavaScript | -36 | -4 | -7 | -47 |
| [server/seed.js](/server/seed.js) | JavaScript | -125 | -4 | -15 | -144 |
| [server/services/PaymentService.js](/server/services/PaymentService.js) | JavaScript | -83 | -1 | -11 | -95 |
| [src/App.jsx](/src/App.jsx) | JavaScript JSX | 81 | 4 | 12 | 97 |
| [src/components/AddressForm.jsx](/src/components/AddressForm.jsx) | JavaScript JSX | 58 | 0 | 3 | 61 |
| [src/components/AdminNavbar.jsx](/src/components/AdminNavbar.jsx) | JavaScript JSX | 47 | 0 | 5 | 52 |
| [src/components/BOSGrid.jsx](/src/components/BOSGrid.jsx) | JavaScript JSX | 38 | 0 | 2 | 40 |
| [src/components/Breadcrumb.jsx](/src/components/Breadcrumb.jsx) | JavaScript JSX | 16 | 0 | 4 | 20 |
| [src/components/ErrorBoundary.jsx](/src/components/ErrorBoundary.jsx) | JavaScript JSX | 61 | 1 | 7 | 69 |
| [src/components/HeroSection.jsx](/src/components/HeroSection.jsx) | JavaScript JSX | 31 | 0 | 1 | 32 |
| [src/components/Navbar.jsx](/src/components/Navbar.jsx) | JavaScript JSX | 101 | 1 | 11 | 113 |
| [src/components/OrderSummary.jsx](/src/components/OrderSummary.jsx) | JavaScript JSX | 34 | 0 | 3 | 37 |
| [src/components/PaymentSelector.jsx](/src/components/PaymentSelector.jsx) | JavaScript JSX | 40 | 0 | 3 | 43 |
| [src/components/ProductCard.jsx](/src/components/ProductCard.jsx) | JavaScript JSX | 66 | 0 | 3 | 69 |
| [src/components/QuantityControl.jsx](/src/components/QuantityControl.jsx) | JavaScript JSX | 14 | 0 | 1 | 15 |
| [src/components/Stepper.jsx](/src/components/Stepper.jsx) | JavaScript JSX | 32 | 0 | 4 | 36 |
| [src/components/TopBar.jsx](/src/components/TopBar.jsx) | JavaScript JSX | 8 | 0 | 1 | 9 |
| [src/components/TrustBadges.jsx](/src/components/TrustBadges.jsx) | JavaScript JSX | 10 | 0 | 1 | 11 |
| [src/context/AdminContext.jsx](/src/context/AdminContext.jsx) | JavaScript JSX | 238 | 5 | 27 | 270 |
| [src/context/AppContext.jsx](/src/context/AppContext.jsx) | JavaScript JSX | 252 | 12 | 24 | 288 |
| [src/context/CartContext.jsx](/src/context/CartContext.jsx) | JavaScript JSX | 84 | 2 | 15 | 101 |
| [src/data/constants.js](/src/data/constants.js) | JavaScript | 73 | 0 | 8 | 81 |
| [src/index.css](/src/index.css) | PostCSS | 1,273 | 44 | 69 | 1,386 |
| [src/main.jsx](/src/main.jsx) | JavaScript JSX | 18 | 0 | 3 | 21 |
| [src/pages/AdminDashboard.jsx](/src/pages/AdminDashboard.jsx) | JavaScript JSX | 80 | 0 | 9 | 89 |
| [src/pages/AdminLoginPage.jsx](/src/pages/AdminLoginPage.jsx) | JavaScript JSX | 75 | 0 | 10 | 85 |
| [src/pages/AdminOrders.jsx](/src/pages/AdminOrders.jsx) | JavaScript JSX | 384 | 11 | 31 | 426 |
| [src/pages/AdminProducts.jsx](/src/pages/AdminProducts.jsx) | JavaScript JSX | 501 | 3 | 27 | 531 |
| [src/pages/AdminUsers.jsx](/src/pages/AdminUsers.jsx) | JavaScript JSX | 129 | 0 | 11 | 140 |
| [src/pages/CartPage.jsx](/src/pages/CartPage.jsx) | JavaScript JSX | 241 | 3 | 23 | 267 |
| [src/pages/ConfiguratorPage.jsx](/src/pages/ConfiguratorPage.jsx) | JavaScript JSX | 34 | 0 | 3 | 37 |
| [src/pages/HomePage.jsx](/src/pages/HomePage.jsx) | JavaScript JSX | 542 | 19 | 47 | 608 |
| [src/pages/LoginPage.jsx](/src/pages/LoginPage.jsx) | JavaScript JSX | 111 | 0 | 14 | 125 |
| [src/pages/ShopPage.jsx](/src/pages/ShopPage.jsx) | JavaScript JSX | 127 | 2 | 16 | 145 |
| [src/pages/SuccessPage.jsx](/src/pages/SuccessPage.jsx) | JavaScript JSX | 53 | 0 | 3 | 56 |
| [src/pages/steps/Step1Technology.jsx](/src/pages/steps/Step1Technology.jsx) | JavaScript JSX | 66 | 1 | 7 | 74 |
| [src/pages/steps/Step2Panels.jsx](/src/pages/steps/Step2Panels.jsx) | JavaScript JSX | 131 | 0 | 12 | 143 |
| [src/pages/steps/Step3Inverter.jsx](/src/pages/steps/Step3Inverter.jsx) | JavaScript JSX | 138 | 0 | 13 | 151 |
| [src/pages/steps/Step4BOS.jsx](/src/pages/steps/Step4BOS.jsx) | JavaScript JSX | 61 | 0 | 5 | 66 |
| [src/pages/steps/Step5Checkout.jsx](/src/pages/steps/Step5Checkout.jsx) | JavaScript JSX | 75 | 0 | 6 | 81 |
| [src/services/api.js](/src/services/api.js) | JavaScript | 79 | 3 | 22 | 104 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details