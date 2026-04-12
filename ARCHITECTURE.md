# Samrat Solar - Detailed Architecture Diagram

The diagram below maps out the exact internal structure of your project based on the files present in your `src` and `server` folders.

```mermaid
graph TD
    %% Styling
    classDef frontend fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#000
    classDef backend fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000
    classDef database fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000
    classDef external fill:#fce4ec,stroke:#c2185b,stroke-width:2px,color:#000
    classDef file fill:#ffffff,stroke:#999,stroke-width:1px,color:#000
    
    %% Users
    U((Browser / User)) --> F_App
    
    %% FRONTEND
    subgraph Frontend [React / Vite Frontend Layer]
        direction TB
        F_App["App.jsx / main.jsx"]:::file
        
        subgraph F_Context [State Management]
            direction TB
            Ctx_Auth["AuthContext"]:::file
            Ctx_Cart["CartContext"]:::file
        end
        
        subgraph F_Pages [UI Pages]
            direction TB
            P_Home["HomePage"]:::file
            P_Shop["ShopPage"]:::file
            P_Cart["CartPage"]:::file
            P_Admin["AdminDashboard"]:::file
        end
        
        subgraph F_Services [API Services]
            S_API["Axios / Fetch Handlers"]:::file
        end
        
        F_App --> F_Pages
        F_Pages --> F_Context
        F_Pages --> F_Services
    end
    class Frontend frontend

    %% Data flow from frontend to backend
    S_API == "HTTP/REST JSON" ==> B_Index
    
    %% BACKEND
    subgraph Backend [Node.js / Express Backend Layer]
        direction TB
        B_Index["API Gateway (index.js)"]:::file
        
        subgraph B_Middleware [Middleware]
            M_Auth["Auth Verification (JWT)"]:::file
            M_Admin["Admin Verification"]:::file
        end
        
        subgraph B_Routes [Express Routes]
            R_Auth["auth.js (Login/Register)"]:::file
            R_Prod["products.js (Catalog)"]:::file
            R_Order["orders.js (Checkout)"]:::file
            R_Admin["admin.js (Management)"]:::file
        end
        
        subgraph B_Models [Mongoose Models]
            Mod_User["User.js"]:::file
            Mod_Prod["Product.js"]:::file
            Mod_Order["Order.js"]:::file
        end
        
        B_Index --> B_Middleware
        B_Middleware --> B_Routes
        B_Routes --> B_Models
    end
    class Backend backend

    %% Database Connection
    Mod_User -. "Mongoose ODM" .-> DB_Users
    Mod_Prod -. "Mongoose ODM" .-> DB_Prods
    Mod_Order -. "Mongoose ODM" .-> DB_Orders

    %% DATABASE
    subgraph DB [MongoDB Database]
        DB_Users[("Users Collection")]:::file
        DB_Prods[("Products Collection")]:::file
        DB_Orders[("Orders Collection")]:::file
    end
    class DB database

    %% EXTERNAL API
    subgraph External [External Services]
        EXT_Razor["Razorpay Payment Gateway"]:::file
    end
    class External external

    %% Payment Flow
    R_Order == "Create Order API" ==> EXT_Razor
    EXT_Razor -. "Webhook Confirmation" .-> R_Order
```

### Explaining the Deep Architecture

1. **The User Flow:** A user opens the app and hits `App.jsx`. They navigate to a page like `ShopPage`.
2. **Global State:** If they add an item to their cart, it triggers `CartContext` in the frontend state.
3. **API Request:** When checking out, `CartPage` uses the **API Services** to construct a POST request.
4. **Backend Routing:** The Express server (`index.js`) receives the request. It passes through **Middleware** to verify the user's JWT.
5. **Business Logic:** If authenticated, the request hits the `orders.js` route. 
6. **Payment Gateway:** The route reaches out to **Razorpay** to initialize a payment intent.
7. **Database Storage:** Once confirmed, the `Order.js` model communicates with **MongoDB** to permanently save the record.
