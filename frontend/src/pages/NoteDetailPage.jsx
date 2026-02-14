import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import api from '../lib/axios';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import NoteCard from '../components/NoteCard';
import { Link } from 'react-router';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams(); // hàm lấy tham số trên URL trả về object
  // console.log({id}); // object thì truy cập cần {}
  // ${} nếu truyền vào object thì gây lỗi không render được
  // do đó phải đặt luôn {id} để trả ra text
  useEffect(() => {
    const fetchNote = async()=>{
      try{
        const res = await api.get(`/notes/${id}`);
        setNote(res.data)
      }
      catch(error){
        console.log("Error in fetchNote", error);
        toast.error("Failed to load note");
      }
      finally{
        setLoading(false);
      }
    }

    fetchNote();
  }, [id]) // id đổi thì không load lại trang (unmount) nên chỉ re-render
  
  const handleDelete = () =>{
    if(!window.confirm("Are you sure you want to delete this note?")) return;

    try{
      api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    }
    catch(error){
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  }
  const handleSave = ()=>{
    if(!note.title.trim() || !note.content.trim()){ // do trong model backend đã khai báo nên phải tuân thủ
      toast.error("All fields are required");
      return;
    }
    try{
      setSaving(true);
      api.put(`/notes/${id}`, note);
      toast.success("Note saved successfully");
      navigate("/");
    }
    catch(error){
      console.log("Error in handleSave", error);
      toast.error("Failed to save note");
    }
    finally{
      setSaving(false);
    }
    
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              {/* copy từ create page */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteDetailPage