# FULL STACK MINI PROJECT REPORT

## Problem Statement
The client, **Samrat Solar**, required a complete, digital e-commerce solution to facilitate the transition to renewable energy for their customers. The problem was identifying a user-friendly way for businesses and individuals to browse and purchase solar products (Tech components, Panels, Inverters, and Balance of Systems). The solution had to be a dynamic full-stack platform capable of secure user authentication, catalog management, and seamless payment processing.

## Requirement Analysis

### Functional Requirements
- **User Authentication:** Registration, login, and secure session management using zero-state JWT tokens.
- **Product Catalog:** Ability to browse distinct categories (Tech, Panels, Inverters, BOS).
- **Shopping Cart & Checkout:** A dynamic cart with a multi-step checkout process (using a Stepper).
- **Payment Integration:** Secure online transactions processing via Razorpay.
- **Order Management:** Ability for users to view and track their placed orders.

### Non-Functional Requirements
- **Performance:** Optimized loading times using React (Vite) and fast API JSON responses.
- **Security:** Password hashing in the database, secure JWT transmission, and protected API endpoints.
- **Usability:** A highly responsive design providing an intuitive and seamless experience across Desktop and Mobile devices using a custom UI aesthetic alongside deep green and accent gold colors.

## Technology Stack
- **Frontend:** React.js (built with Vite) / HTML / CSS / JavaScript
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Payment Gateway:** Razorpay

## System Architecture

**Information Flow:** 
**User → Frontend (React.js) → Backend (Node.js/Express APIs) → Database (MongoDB) → JSON Response → UI Updates**

1. The **User** interacts with the React frontend via their browser.
2. The **Frontend** dispatches HTTP requests using the `fetch` API (`src/services/api.js`) passing the JWT authorization headers when necessary. 
3. The **Backend** receives the request at specific RESTful endpoints, authenticates the user, and triggers database controllers.
4. The **Database** (MongoDB Atlas) retrieves, updates, or stores the required structured data (Users, Products, Orders) and sends it back to the backend.
5. The **Backend** formulates a structured JSON response to send back to the client.
6. The **Frontend** updates its state dynamically and visually renders the appropriate data to the User.

*(Note: Draw a block diagram showing these 5 blocks connected with directional arrows in your final physical report.)*

## Implementation Details

### Frontend Implementation
- **Pages Developed:** Home Page, Product Browsing Pages (Panels, Inverters, BOS, Tech), Authentication Pages (Login/Register), Cart / Checkout Page, and Order History.
- **UI Design:** Implemented a modern, responsive user interface emphasizing the brand's solar identity (e.g. hero banners, benefit cards, smooth interactions) and a custom step-by-step checkout component (`Stepper.jsx`).

### Backend Implementation
- **APIs Created:** 
  - Authentication: `/api/auth/login`, `/api/auth/register`, `/api/auth/me`
  - Products: `/api/products/tech`, `/api/products/panels`, `/api/products/inverters`
  - Orders & Payments: `/api/orders`, `/api/orders/create-payment`, `/api/orders/verify-payment`
- **Logic Handling:** Implemented middleware to verify JWT tokens before accessing secure routes, as well as complex logic generating Razorpay orders and verifying payment signatures.

### Database Implementation
- **Schema Design:** Created distinct Mongoose schemas for structured data:
  - `UserSchema`: For storing name, email, hashed passwords, and contact info.
  - `ProductSchema`: For categorized item specifics, pricing, and image URLs.
  - `OrderSchema`: Relational linking between Users, Products, and Payment Statuses.
- **Data Storage:** Data is stored remotely on MongoDB Atlas to ensure cloud availability.

## Screenshots

*(Be sure to replace the bracketed text below with your actual screenshots in your document)*

1. **[ Insert Home Page Screenshot Here ]**
   - **Caption:** Samrat Solar Homepage
   - **Description:** Showcases the Hero Banner and "Why Switch to Solar" informational benefit cards.

2. **[ Insert Form Page Screenshot Here ]**
   - **Caption:** User Authentication & Registration Page
   - **Description:** The form users utilize to securely register for an account using their email and password.

3. **[ Insert Output Page Screenshot Here ]**
   - **Caption:** Dynamic Product Catalog
   - **Description:** Displays fetched solar equipment (Panels/Inverters) pulled directly from the MongoDB backend.

4. **[ Insert Dashboard/Checkout Screenshot Here ]**
   - **Caption:** Order Checkout & Stepper Flow
   - **Description:** Shows the step-by-step cart summary leading up to the Razorpay checkout overlay.

## API Testing

- **[ Insert Postman Screenshot for POST /api/auth/login Here ]**
  - **Description:** Testing successful generation of user auth token.
- **[ Insert Postman Screenshot for GET /api/products/panels Here ]**
  - **Description:** Successful GET fetch of product array.

**CRUD Operations Tested:**
- **Create:** User Accounts, New Orders
- **Read:** Fetching Product Lists, Fetching User Profile (`/auth/me`)
- **Update:** Updating Order Payment Status (Pending to Success)
- **Delete:** Handling cart clearance upon successful checkout.

## Deployment Details
- **Frontend URL (Live):** `[ Insert your deployed Netlify/Vercel link here, e.g. https://samrat-solar.netlify.app ]`
- **Backend URL (API):** `[ Insert your deployed Render link here, e.g. https://samrat-backend.onrender.com ]`
- **Database:** MongoDB Atlas (Cloud Cluster)

## Final Output / Result
- The full-stack Samrat Solar application is successfully integrated, routed and working online.
- Sensitive user data, inventory catalogs, and complex order tracking is accurately stored and retrieved across the front and back end.
- All functional features (Auth, Browsing, and Razorpay Payments) have been implemented as intended.

## Client Feedback
*(Fill in actual quotes or feedback provided by your client when you demonstrate the project)*
> "[ Write client feedback here, e.g., 'The website performs excellently and the checkout stepper makes it very easy for our customers to order solar components...' ]"

## Geotagged Photo with Client
**[ Paste Photo Here ]**
- **Caption:** Discussion/Deployment with Client (Samrat Solar Representative)
- *(Ensure the location metadata is visible or use a printed geotag overlay on the image).*

## Limitations
- Requirement for continuous high-speed internet availability to process Razorpay payments smoothly.
- Real-time inventory tracking is manual, lacking direct integration with warehouse scanners.

## Future Scope
- **Advanced Authentication:** Adding OAuth (Login with Google/Facebook) for quicker onboarding.
- **Admin Dashboard:** Creating a dedicated admin interface to allow the client to add/edit products or view detailed sales analytics.
- **Improve UI/UX:** Introduce 3D modeled previews of Solar Panels and Inverters.

## Conclusion
Developing the Samrat Solar full-stack application presented a comprehensive real-world learning experience. It successfully solidified concepts across dynamic React UI development, secure Node.js API generation, MongoDB data architecture, and complex third-party API integration (Razorpay). Moving from a local environment to fully deployed cloud services bridged the gap between theoretical knowledge and practical software engineering.

## References
1. [React Documentation](https://react.dev/)
2. [Express.js Documentation](https://expressjs.com/)
3. [MongoDB Mongoose Setup](https://mongoosejs.com/docs/)
4. [Razorpay API Integration Guide](https://razorpay.com/docs/api/)
5. React Router and Deployment Tutorials via MDN Web Docs.
