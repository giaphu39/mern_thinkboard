import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";
import axios from "axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  //điều kiện là phải được bọc bằng BrowserRouter
  const navigate = useNavigate(); //hook của React Router dùng để chuyển trang bằng JavaScript

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent refresh lại trang 

    //dòng này là check title, content phải có text thì mới được summit
    if (!title.trim() || !content.trim()) { // trim khóa khoảng trắng đầu và cuối 
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      // dùng trực tiếp nhưng chưa sát do lộ backend
      await axios.post("http://localhost:3000/api/notes", { title, content });
      // await api.post("/notes", { // đây là viết kiểu global instance -> tính không lặp lại trong oop
      //   title,
      //   content,
      // });

      toast.success("Note created successfully!");
      navigate("/"); // -1 là backward, 1 là forward
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };
  // cái sẽ hiện thị ra trong thực tế
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* link đến trang home được định nghĩa trong App.jsx */}
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title} // value cho vào state là title
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  {/* disabled khi loading nghĩa là khi loading thì không tác động button summit được */}
                  <button type="submit" className="btn btn-primary" disabled={loading}> 
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePage;


// | Lệnh                             | Ý nghĩa                  |
// | -------------------------------- | ------------------------ |
// | navigate("/")                    | Điều hướng tới route mới |
// | navigate(-1)                     | Quay lại 1 bước history  |
// | navigate(1)                      | Đi tới 1 bước forward    |
// | navigate("/", { replace: true }) | Thay thế route hiện tại  |

// SPA 
// /notes → React Router xử lý → render component khác
// Không reload trang.
// Chỉ đổi component trong React tree.



// navigate() hoạt động thế nào bên trong?
// React Router:
// Lắng nghe history API của browser
// Khi bạn gọi navigate
// Nó push route mới vào history stack
// React render component tương ứng
// Không có refresh.
// // bản chất Browser có một cấu trúc gọi là:
// History Stack
// vd: [ "/", "/create", "/note/123" ]

