# Bank Transaction System

A full-stack bank transaction / ledger management system with a Node.js/Express backend and a React (Vite) frontend. Users can register, log in, manage accounts, and transfer funds, with a transaction history view and dashboard.

## Tech Stack

**Backend (`Backend Ledger/`)**
- Node.js + Express
- MongoDB (via `src/config/db.js`)
- JWT-based authentication (`src/middleware/auth.middleware.js`)
- Email service integration (`src/services/email.services.js`)

**Frontend (`frontend/frontend/`)**
- React + Vite
- Context API for theming (`src/context/ThemeContext.jsx`)
- Protected routes for authenticated pages

> Update the stack details above if any of these assumptions don't match your actual implementation.

## Project Structure

```
banktransactionsystem/
├── Backend Ledger/
│   ├── server.js
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── account.controller.js
│   │   │   ├── auth.controller.js
│   │   │   └── transaction.controller.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   ├── models/
│   │   │   ├── account.model.js
│   │   │   ├── blackList.model.js
│   │   │   ├── ledger.model.js
│   │   │   ├── transaction.model.js
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── account.routes.js
│   │   │   ├── auth.routes.js
│   │   │   └── transaction.routes.js
│   │   └── services/
│   │       └── email.services.js
│   └── package.json
│
└── frontend/frontend/
    ├── index.html
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── components/
    │   │   ├── Layout.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── accountcard.jsx
    │   │   ├── sidebar.jsx
    │   │   └── transcationcard.jsx
    │   ├── context/
    │   │   └── ThemeContext.jsx
    │   ├── pages/
    │   │   ├── dashboard.jsx
    │   │   ├── login.jsx
    │   │   ├── register.jsx
    │   │   ├── profile.jsx
    │   │   ├── Accounts.jsx
    │   │   ├── Transactions.jsx
    │   │   └── transfer.jsx
    │   └── services/
    │       └── api.js
    └── package.json
```

## Features

- User registration and login (JWT authentication)
- Account management
- Fund transfers between accounts
- Transaction history / ledger view
- Dashboard overview of accounts and recent activity
- Light/dark theme support

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm
- A MongoDB instance (local or cloud, e.g. MongoDB Atlas)

### Backend Setup

```bash
cd "Backend Ledger"
npm install
```

Create a `.env` file inside `Backend Ledger/` (this file is git-ignored and should **never** be committed):

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# If using Google OAuth / email service
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
```

Start the backend server:

```bash
node server.js
```

### Frontend Setup

```bash
cd frontend/frontend
npm install
npm run dev
```

The frontend will typically run at `http://localhost:5173` and the backend at `http://localhost:5000` (adjust based on your actual configuration).

## Environment Variables

Never commit `.env` files. Make sure `.env` is listed in `.gitignore` at the root of each app (`Backend Ledger/.env` in particular). If credentials were ever committed to Git history, rotate them immediately in the relevant provider's console.

## License

This project is for educational purposes only and is not licensed for reuse or distribution.