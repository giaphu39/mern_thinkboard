import {useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import { useEffect } from 'react'
import RateLimitedUI from '../components/RateLimitedUI'
import Note from '../../../backend/src/models/Note' // sai frontend không bao giờ được truy cập backend

import api from "../lib/axios";
const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes,setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchNotes = async()=>{
      try{
        // const res = await fetch("https://localhost:3000/api/notes") // 3000 này là port của backend
        // const data = await res.json();
        // const res = await axios.get("http://localhost:3000/api/notes")
        const res = await api.get("/notes")
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);

      }
      catch(error){
        console.log("Error in fetchNotes", error);
        if(error.response?.status === 429){ //too many requests
          setIsRateLimited(true);
        }
        else{
          toast.error("Failed to load notes")
        }
      }
      finally{
        setLoading(false);
      }
    }

    fetchNotes();
  },[])
  return (
    <div className='min-h-screen'>
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {notes.map((note) => (
            // <div>
            //   {note.title} | {note.content}
            // </div>
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
        )}
        
      </div>

    </div>
  )
}

export default HomePage

// useEffect cho phép component "phản ứng" lại sự thay đổi của state/props hoặc vòng đời render.
// useEffect được sử dụng để xử lý side effects, ví dụ:
// Gọi API
// Lắng nghe event (scroll, resize…)
// Set timeout / interval
// Tương tác với DOM
// Subscribe / unsubscribe dữ liệu
// LocalStorage
// WebSocket

//cấu trúc
// useEffect(() => {
//   // code side effect ở đây
// }, [dependencies]);
// // chạy khi dependencies thay đổi

// |                     | fetch       | axios    |
// | ------------------- | ----------- | -------- |
// | Parse JSON          | thủ công    | tự động  |
// | HTTP error          | không throw | tự throw |
// | Base URL            | không       | có       |
// | Interceptor         | không       | có       |
// | Timeout             | khó         | có sẵn   |
// | Cancel request      | phức tạp    | dễ       |
// | Upload progress     | khó         | có       |
// | DX (dev experience) | thấp        | cao      |
