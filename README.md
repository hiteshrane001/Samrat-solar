# ☀️ Samrat Solar - Customer Order & Configurator Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tech: MERN](https://img.shields.io/badge/Tech-MERN-green.svg)](https://www.mongodb.com/mern-stack)

A professional, full-stack solar energy platform designed to streamline customer acquisition and order management. This application features an interactive 5-step solar configurator, real-time inventory tracking, and integrated secure payments.

---

## 🚀 Deployment Guide (Render.com)

This project is optimized for a **Monolith Deployment** as a single Render Web Service.

### 1. Preparations
- Push your code to a private GitHub repository.
- Ensure your MongoDB Atlas cluster is running and the IP Whitelist allows all access (`0.0.0.0/0`) or specifically Render's IPs.

### 2. Create Web Service on Render
1.  **New + > Web Service**.
2.  Connect your GitHub repository.
3.  **Environment Configuration**:
    - **Runtime**: `Node`
    - **Build Command**: `npm install && cd server && npm install && cd .. && npm run build`
    - **Start Command**: `node server/index.js`

### 3. Environment Variables
Add the following keys in the **Environment** tab on Render:
| Key | Value Description |
| :--- | :--- |
| `NODE_ENV` | `production` |
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A strong, random string for authentication |
| `RAZORPAY_KEY_ID` | Your Razorpay Live/Test Key ID |
| `RAZORPAY_KEY_SECRET` | Your Razorpay Live/Test Key Secret |
| `FRONTEND_URL` | Your Render `.onrender.com` URL |

---

## 🎯 Key Features

### 🛠️ Interactive Solar Configurator
*   **Step 1: Technology Select**: Choose between HJT, N-Type TOPCon, or PERC panels.
*   **Step 2: Panel Layout**: Dynamic quantity selection with real-time wattage calculation.
*   **Step 3: Inverter Match**: Automatic recommendation of inverter capacity based on total load.
*   **Step 4: BOS Generation**: Pre-configured Balance of System components.
*   **Step 5: Smart Checkout**: Integrated Razorpay payment and order submission.

### 📦 Inventory Management (Admin)
*   Real-time stock level tracking.
*   **Sold Out** and **Coming Soon** status indicators that automatically disable user ordering.
*   Inline stock editing within the secure Admin portal.

### 🔒 Security
*   **Data Integrity**: Server-side verification of all financial calculations.
*   **Auth**: JWT-based secure session management.
*   **Hardening**: Helmet.js and Express Rate Limiting implemented.

---

## 🛠️ Tech Stack

*   **Frontend**: React (Vite), Context API, CSS3.
*   **Backend**: Node.js, Express.
*   **Database**: MongoDB (Mongoose).
*   **Payments**: Razorpay SDK.

---

## 💻 Local Development Setup

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/samrat-solar.git
    cd samrat-solar
    ```
2.  **Install All Dependencies**:
    ```bash
    npm install
    cd server && npm install
    ```
3.  **Configure Environment**:
    Create a `.env` file in the `server/` directory following the `.env.example` template.
4.  **Run Development Server**:
    -   **Backend**: `cd server && npm run dev`
    -   **Frontend**: `npm run dev` (from root)

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

**Built for Samrat Solar PVT. LTD.**
