# 📱 iPhone Store — Frontend (React)

A modern, responsive e-commerce frontend for selling Apple iPhones.  
Built with **React**, **React Router**, **Framer Motion**, **AOS**, and **CSS Modules**.  
This README is beginner-friendly — follow it step-by-step to run the app locally.

---

## ✨ Features
- 🏠 Home page with hero section & featured products  
- 📱 Product listing with filtering & sorting  
- 🔍 Product detail page with image gallery  
- 🛒 Shopping cart with update/remove item  
- 💳 Checkout flow (works with backend payment endpoints)  
- 📱 Fully responsive, Apple-inspired UI  
- ✨ Smooth animations (Framer Motion & AOS)

---

## 🧭 Quick start (Beginner-friendly)

### Prerequisites
- Node.js v14 or higher (recommended v16+)
- npm (or yarn)
- Backend API running (see your backend repo). Default backend base URL: `http://localhost:3000/api`.

### 1) Clone repo
```bash
git clone https://github.com/2512001/istoreclient.git
cd iphone-store-client
2) Install dependencies
bash
Copy code
npm install
# or
yarn
3) Create environment file
Create a .env file in the project root (or copy .env.example):

bash
Copy code
cp .env.example .env
Edit .env and set VITE_API_BASE_URL (or REACT_APP_API_BASE_URL depending on your setup) to point to your backend.

4) Run the dev server
If the project uses Vite (common for modern React setups):

bash
Copy code
npm run dev
# open http://localhost:5173 (or the port shown in terminal)
If the project uses Create React App (CRA):

bash
Copy code
npm start
# open http://localhost:3000 (or port shown in terminal)
5) Build for production
bash
Copy code
npm run build
# (Vite) npm run preview  -> to preview production build
🧾 .env.example (copy to .env and edit)
For Vite-based projects use VITE_ prefix. For CRA use REACT_APP_.

env
Copy code
# frontend/.env.example

# Base URL for backend API (change to your backend)
VITE_API_BASE_URL=http://localhost:3000/api

# If using CRA, use
# REACT_APP_API_BASE_URL=http://localhost:3000/api

# Optional: analytics / 3rd-party keys (do NOT commit secrets)
# VITE_SOME_KEY=your_key_here
🔧 How frontend talks to backend
Use import.meta.env.VITE_API_BASE_URL (Vite) or process.env.REACT_APP_API_BASE_URL (CRA) as the API base.

Example fetch:

js
Copy code
const API_BASE = import.meta.env.VITE_API_BASE_URL; // Vite
// const API_BASE = process.env.REACT_APP_API_BASE_URL; // CRA

// Fetch products
const res = await fetch(`${API_BASE}/products`);
const products = await res.json();
Send JWT token on protected routes:

makefile
Copy code
Authorization: Bearer <access_token>
📁 Recommended Project Structure
pgsql
Copy code
src/
├── assets/            # images, fonts, icons
├── components/        # small, reusable components (Button, Card, Navbar)
│   ├── UI/
│   └── Product/
├── pages/             # top-level pages (Home, Products, ProductDetail, Cart, Checkout)
├── context/           # AuthContext, CartContext
├── services/          # api client (axios/fetch wrapper)
├── hooks/             # custom hooks (useAuth, useCart, useFetch)
├── styles/            # CSS Modules & global CSS
├── utils/             # helpers (formatPrice, validators)
├── App.jsx
└── main.jsx
Tip: Keep UI components small and reusable. Pages should compose components.

🧩 Useful files to look for (beginner roadmap)
src/pages/Home.jsx — Homepage layout & hero

src/pages/ProductList.jsx — Product listing & filters

src/pages/ProductDetail.jsx — Product page with gallery & add to cart

src/pages/Cart.jsx — Cart UI & update/remove items

src/pages/Checkout.jsx — Checkout form and order submission

src/context/AuthContext.jsx — Auth state & token handling

src/services/apiClient.js — centralized API calls & token injection

src/styles/ — CSS Modules for components/styles

🔌 Sample apiClient.js (axios wrapper)
Create src/services/apiClient.js to centralize requests and attach tokens:

js
Copy code
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL; // or process.env.REACT_APP_API_BASE_URL

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Add auth token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
🧪 Testing & debug tips
Use browser DevTools > Network to inspect API calls and responses.

If data is empty, first check backend is running and .env VITE_API_BASE_URL is correct.

For CORS issues, enable cors() on backend (see backend README).

Use Postman or Insomnia to test backend endpoints directly.

🪲 Common Issues & Fixes
App can’t fetch data
→ Ensure backend is running and the API base URL in .env is correct.

CORS errors in browser
→ Add app.use(cors({ origin: 'http://localhost:5173' })) or origin: '*' in backend while developing.

Images not showing
→ Verify Cloudinary upload settings and returned image URLs from backend.

Auth token missing or expired
→ Confirm login flow stores token (e.g., localStorage.setItem("accessToken", token)), and refresh if implemented.

Wrong port
→ Vite usually runs on 5173. CRA runs on 3000. Check terminal output.

♻️ Recommended Improvements (nice-to-have)
Add an .env.example file (already included above) and add it to repo.

Add AuthContext with refresh-token mechanism.

Create a ProtectedRoute component for private pages.

Add unit tests for key components (Jest + React Testing Library).

Add a small seed script in backend and sample products so frontend has data to show.

🧾 Scripts (check package.json)
Common scripts you should have (adjust if different):

json
Copy code
"scripts": {
  "dev": "vite",         // or "start" for CRA => "react-scripts start"
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "format": "prettier --write ."
}
🤝 Contributing
Fork the repo

Create a branch git checkout -b feature/your-feature

Commit: git commit -m "Add new feature"

Push & open a PR

📜 License
MIT — see the LICENSE file.

🎉 You're ready!
If you want, I can also:

create src/services/apiClient.js file and AuthContext boilerplate for you, or

produce a sample .env.example and commit it to the repo, or

add a small demo seed script (backend) so frontend shows products immediately.

Just tell me which one to add next and I’ll produce the code you can paste directly.

yaml
Copy code

--- 

Would you like me to generate the `apiClient.js` and `AuthContext` files now so you can paste them into your frontend repo?
