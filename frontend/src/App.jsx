//rafc phím tắt nhanh, tốt hơn dùng rafce
import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import  toast, {Toaster} from "react-hot-toast"


// https://bg.ibelick.com/
// có thể tham khảo link này để tạo background cho web

export default function App (){
  return (
    // do thường có thể bọc theme nên lúc nào code cũng phải có 1 div thừa ở đầu bọc lại tất cả
    // khi thay đổi gì trong config thì phải npm run dev lại mơi hiệu lực
    <div data-theme="forest">
      {/*trong daisyui btn → áp style button mặc định (padding, border-radius, font, hover...)
btn-outline → biến thể dạng outline (chỉ viền, không nền) */}
      {/* <button className='btn btn-primary'>click me</button> */}
      {/* <button onClick={()=>toast.success("Chuc mung ban")} className='text-red-500 p-4 bg-pink-300'>Click me</button> */}
      {/* lỗi do đặt sai tên */}
      <Routes> 
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/create" element={<CreatePage/>}></Route>
        <Route path="/note/:id" element={<NoteDetailPage/>}></Route>
      </Routes>

    </div>
  )
}


// React Router v6 có 3 tầng:
// BrowserRouter → quản lý URL
// Routes → container match route
// Route → định nghĩa path

// Kiến trúc thật của React Router:

// react-router → core logic

// react-router-dom → binding cho web

// react-router-native → binding cho React Native