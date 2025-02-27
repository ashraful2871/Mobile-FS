# **Mobile Financial Service (MFS) Application**

## **Introduction**

This is a **secure and user-friendly Mobile Financial Service (MFS) application** similar to platforms like **bKash** or **Nagad**. The system supports three roles: **Users, Agents, and Admins**, each with distinct functionalities. Users can perform transactions such as **send money, cash-in, and cash-out**, while agents facilitate cash-in transactions and request balance recharges from admins. The admin oversees and manages the platform.

## **Table of Contents**

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication & Security](#authentication--security)
- [Transactions & Fees](#transactions--fees)
- [User Roles & Permissions](#user-roles--permissions)
- [Admin Credentials](#admin-credentials)
- [Contributors](#contributors)
- [License](#license)

## **Features**

### **User Features**

✅ Register with **Name, Mobile Number, Email, PIN (5-digit), and NID**  
✅ Receive a **40 Taka bonus** upon registration  
✅ **Send Money** to other users (Fee: **5 Taka for transactions over 100 Taka**)  
✅ **Cash-In** from an agent (**0 Fee**)  
✅ **Cash-Out** to an agent (Fee: **1.5%**)  
✅ **Balance Inquiry** (Initially hidden, click to reveal)  
✅ **Transaction History** (Last 100 transactions)

### **Agent Features**

✅ Register with **Name, Mobile Number, Email, PIN (5-digit), and NID**  
✅ Requires **Admin Approval** before activation  
✅ Receive **100,000 Taka** in their account upon approval  
✅ Can request a **Balance Recharge** from the admin  
✅ Earn **1%** on each user **cash-out transaction**  
✅ **Transaction History** (Last 100 transactions)

### **Admin Features**

✅ Manage **Users & Agents** (Approve/Block)  
✅ Approve **Agent Requests**  
✅ **Recharge Agent Balances**  
✅ Earn **0.5% from cash-out transactions**  
✅ Earn **5 Taka per transaction**  
✅ **Monitor Total Money** in the system  
✅ **View all Transactions**

## **Technology Stack**

### **Frontend:**

- **React 19**
- **React Router 7**
- **TailwindCSS + DaisyUI**
- **Axios**
- **React Query**
- **SweetAlert2**
- **Lottie-React**
- **Firebase** (for Authentication)

### **Backend:**

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Bcrypt.js** (for PIN Hashing)
- **Cookie Parser & CORS**

## **Installation**

### **1️⃣ Clone the Repository**

```sh
git https://github.com/ashraful2871/Mobile-FS.git
cd mobile-fs-app
```

### **2️⃣ Setup Backend**

```sh
cd backend
npm install
cp .env.example .env  # Configure environment variables
npm start
```

### **3️⃣ Setup Frontend**

```sh
cd ../frontend
npm install
npm run dev
```

## **Usage**

1️⃣ **Register** as a **User** or **Agent**  
2️⃣ **Admin Approves** Agents  
3️⃣ **Users Send Money, Cash-In, and Cash-Out**  
4️⃣ **Agents Handle Cash-In Transactions**  
5️⃣ **Admin Manages Users, Agents & Transactions**

## **API Endpoints**

### **Authentication**

- `POST /api/register` – Register User/Agent
- `POST /api/login` – User, Agent & Admin Login
- `GET /api/logout` – Logout User

### **User Transactions**

- `POST /api/send-money` – Transfer Money
- `POST /api/cash-in` – Cash-in from an Agent
- `POST /api/cash-out` – Cash-out to an Agent
- `GET /api/balance` – Check Account Balance

### **Agent Actions**

- `POST /api/approve-agent` – Admin Approves Agent
- `POST /api/recharge` – Agent Requests Balance Recharge

### **Admin Actions**

- `GET /api/users` – View All Users
- `PUT /api/block-user/:id` – Block a User
- `POST /api/approve-recharge/:agentId` – Add Money to Agent
- `GET /api/transactions` – View All Transactions

## **Authentication & Security**

✅ **JWT-based Authentication** (Secure & Tokenized Access)  
✅ **Bcrypt.js for PIN Hashing**  
✅ **One Device Login Policy** (Users/Agents can log in from only one device at a time)

## **Transactions & Fees**

| **Transaction Type**           | **Fee**    | **Earned By**                |
| ------------------------------ | ---------- | ---------------------------- |
| **Send Money (Over 100 Taka)** | **5 Taka** | **Admin**                    |
| **Cash-Out (User → Agent)**    | **1.5%**   | **1% (Agent), 0.5% (Admin)** |
| **Cash-In (Agent → User)**     | **0 Taka** | **-**                        |
| **Every Transaction**          | **5 Taka** | **Admin**                    |

## **User Roles & Permissions**

| **Role**  | **Permissions**                                 |
| --------- | ----------------------------------------------- |
| **User**  | Send Money, Cash-In, Cash-Out, Check Balance    |
| **Agent** | Cash-In, Request Recharge, Earn from Cash-Out   |
| **Admin** | Approve Agents, Manage Users, View Transactions |

## **Admin Credentials**

**phone Number:** `01940591004`  
**Password:** `12345`
