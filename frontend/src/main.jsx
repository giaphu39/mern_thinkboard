import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import { Toaster } from 'react-hot-toast';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster></Toaster>
    </BrowserRouter>
  </StrictMode>,
)

// https://chatgpt.com/share/698ea82f-c268-8006-9a97-98114f1a125e
// Provider
//   ↓
// System component
//   ↓
// Hook / API usage

// 1️⃣ Khi dùng một component từ thư viện bất kỳ thì công thức tổng quát là gì?
// 1. Cài thư viện
// 2. Import component / provider
// 3. Đặt "Root Provider" ở tầng cao nhất (thường main.jsx)
// 4. Dùng component con ở tầng dưới
// 5. Cấu hình (props / options / context)