# Samrat Solar API Documentation

Base URL: `http://localhost:5000/api` (development)
Base URL: `https://your-production-domain.com/api` (production)

## Authentication

All endpoints marked 🔐 require a valid JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

Tokens expire after 7 days. Users must log in again to get a new token.

---

## Auth Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "Rajesh Kumar",
  "email": "rajesh@example.com",
  "password": "secure_password_123",
  "phone": "9876543210"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "phone": "9876543210"
  }
}
```

**Error Responses:**
- 400: Email already exists
- 400: Name, email, and password are required

---

### Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "rajesh@example.com",
  "password": "secure_password_123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "phone": "9876543210"
  }
}
```

**Error Responses:**
- 401: Invalid email or password
- 400: Email and password are required

---

### Get Current User Profile 🔐
**GET** `/auth/me`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "phone": "9876543210"
  }
}
```

**Error Responses:**
- 401: Not authenticated
- 401: Invalid token

---

## Product Endpoints

### Get Solar Technologies
**GET** `/products/tech`

**Response (200 OK):**
```json
{
  "products": [
    {
      "techId": "hjt",
      "name": "HJT Bifacial Solar Module",
      "short": "HJT Technology",
      "badge": "Premium",
      "badgeType": "gold",
      "eff": "22–24%",
      "cells": "182mm Half-Cut",
      "power": "Up to 680Wp",
      "warranty": "30 Years",
      "temp": "-0.26%/°C",
      "desc": "Heterojunction Technology...",
      "feats": ["Bifacial Dual-Glass", "Zero LID Degradation", ...],
      "img": "https://...",
      "price": 12500,
      "mrp": 15000
    },
    ...
  ]
}
```

---

### Get Solar Panels
**GET** `/products/panels`

**Response (200 OK):**
```json
{
  "products": [
    {
      "wp": 560,
      "name": "560 Wp Solar Panel",
      "model": "SS-560M-HMB",
      "cells": "144 Half-Cut Cells",
      "voc": "48.2V",
      "isc": "14.82A",
      "img": "https://...",
      "price": 9800,
      "mrp": 12500
    },
    ...
  ]
}
```

---

### Get Inverters
**GET** `/products/inverters`

**Response (200 OK):**
```json
{
  "products": [
    {
      "kw": 3,
      "name": "3kW Single Phase On-Grid Inverter",
      "model": "SS-INV-3K-SP",
      "brand": "Samrat Solar",
      "desc": "Compact, efficient single-phase inverter...",
      "specs": [
        ["Max Input", "4500W"],
        ["MPPT Trackers", "2"],
        ...
      ],
      "img": "https://...",
      "price": 32000,
      "mrp": 38500,
      "badge": "Popular"
    },
    ...
  ]
}
```

---

### Get BOS Kit Components
**GET** `/products/bos`

**Response (200 OK):**
```json
{
  "products": [
    {
      "icon": "⚡",
      "name": "DCDB Box",
      "sub": "4-in 1-out"
    },
    ...
  ],
  "totalPrice": 18500
}
```

---

## Order Endpoints

### Create Order 🔐
**POST** `/orders`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "tech": "hjt",
  "panels": [
    {
      "wp": 560,
      "name": "560 Wp Solar Panel",
      "qty": 4,
      "pricePerUnit": 9800,
      "total": 39200
    }
  ],
  "inverter": 3,
  "paymentMethod": "cod",
  "address": {
    "name": "Rajesh Kumar",
    "phone": "9876543210",
    "address": "House No. 123, Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pin": "400001",
    "landmark": "Near Metro Station"
  }
}
```

**Response (201 Created):**
```json
{
  "order": {
    "orderId": "SS5A1B2C3D4E5F6G7",
    "user": "65a1b2c3d4e5f6g7h8i9j0k1",
    "tech": {
      "id": "hjt",
      "name": "HJT Bifacial Solar Module"
    },
    "panels": [...],
    "inverter": {
      "kw": 3,
      "name": "3kW Single Phase On-Grid Inverter",
      "price": 32000
    },
    "bosPrice": 18500,
    "subtotal": 89700,
    "gst": 16146,
    "total": 105846,
    "paymentMethod": "cod",
    "paymentStatus": "paid",
    "status": "confirmed",
    "address": {...},
    "createdAt": "2026-03-21T...",
    "updatedAt": "2026-03-21T..."
  },
  "message": "Order placed successfully!"
}
```

**For Online Payment Response (201 Created):**
```json
{
  "order": {...},
  "message": "Order created. Proceed to payment.",
  "amountInPaise": 10584600,
  "requiresPayment": true
}
```

**Error Responses:**
- 400: At least one panel is required
- 400: Inverter selection is required
- 400: Complete address is required
- 400: Phone must be 10 digits
- 400: Pincode must be 6 digits
- 401: Not authenticated

---

### Create Razorpay Payment Order 🔐
**POST** `/orders/create-payment`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "orderId": "SS5A1B2C3D4E5F6G7",
  "amount": 105846
}
```

**Response (200 OK):**
```json
{
  "razorpayOrderId": "order_5A1B2C3D4E5F6G7",
  "razorpayKeyId": "rzp_live_1234567890abcd",
  "amount": 10584600,
  "currency": "INR",
  "userName": "Rajesh Kumar",
  "userEmail": "rajesh@example.com",
  "userPhone": "9876543210",
  "orderId": "SS5A1B2C3D4E5F6G7"
}
```

**Error Responses:**
- 400: Order ID and amount are required
- 404: Order not found
- 401: Not authenticated

---

### Verify Razorpay Payment 🔐
**POST** `/orders/verify-payment`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "orderId": "SS5A1B2C3D4E5F6G7",
  "razorpayOrderId": "order_5A1B2C3D4E5F6G7",
  "razorpayPaymentId": "pay_5A1B2C3D4E5F6G7",
  "razorpaySignature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
}
```

**Response (200 OK):**
```json
{
  "message": "Payment verified successfully!",
  "order": {
    "orderId": "SS5A1B2C3D4E5F6G7",
    "paymentStatus": "paid",
    "status": "confirmed",
    "paidAt": "2026-03-21T...",
    ...
  },
  "paymentStatus": "paid"
}
```

**Error Responses:**
- 400: Missing payment details
- 400: Payment signature verification failed
- 404: Order not found
- 401: Not authenticated

---

### Get User's Orders 🔐
**GET** `/orders`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "orders": [
    {
      "orderId": "SS5A1B2C3D4E5F6G7",
      "status": "confirmed",
      "paymentStatus": "paid",
      "total": 105846,
      "createdAt": "2026-03-21T...",
      ...
    },
    ...
  ]
}
```

---

### Get Single Order Details 🔐
**GET** `/orders/:orderId`

**Example:** `/orders/SS5A1B2C3D4E5F6G7`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "order": {
    "orderId": "SS5A1B2C3D4E5F6G7",
    "user": "65a1b2c3d4e5f6g7h8i9j0k1",
    "tech": {...},
    "panels": [...],
    "inverter": {...},
    "total": 105846,
    "status": "confirmed",
    "paymentStatus": "paid",
    "address": {...},
    "createdAt": "2026-03-21T...",
    "updatedAt": "2026-03-21T..."
  }
}
```

**Error Responses:**
- 404: Order not found
- 401: Not authenticated

---

## Health Check

### Server Status
**GET** `/health`

**Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2026-03-21T10:30:45.123Z"
}
```

---

## Error Response Format

All error responses follow this format:
```json
{
  "message": "Description of what went wrong"
}
```

Common HTTP Status Codes:
- `200 OK` - Request succeeded
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid input or request format
- `401 Unauthorized` - Authentication required or failed
- `404 Not Found` - Resource does not exist
- `500 Internal Server Error` - Server error

---

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Headers:** X-RateLimit-Limit, X-RateLimit-Remaining
- **Error:** 429 Too Many Requests

---

## Testing with Curl

Register a user:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "9876543210"
  }'
```

Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Get profile (replace TOKEN with actual JWT):
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

Get products:
```bash
curl -X GET http://localhost:5000/api/products/tech
curl -X GET http://localhost:5000/api/products/panels
curl -X GET http://localhost:5000/api/products/inverters
```

---

## Webhook Integration (Future)

When implementing Razorpay webhooks, listen to:
- `payment.authorized` - Payment successful
- `payment.failed` - Payment failed
- `refund.created` - Refund initiated

All webhook signatures are verified using RAZORPAY_WEBHOOK_SECRET.
