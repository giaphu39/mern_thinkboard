import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js"; // {} do không export default
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"
// lỗi không kết nối do IP có thể chỉnh bằng cách thêm IP cho bất kì người dùng và phải cập nhật nodejs phiên bản mới nhất
// 2 đoạn code này fix lỗi Error connecting to MongoDB Error: querySrv ECONNREFUSED -> luôn nhớ khi gặp lỗi bất kì search google là cách giải quyết nhanh nhất hơn cả youtube và LLM
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]); // Using Cloudflare and Google DNS
// ... your MongoDB connection code follows

// khi dùng chung domain 
import path from "path";
const __dirname = path.resolve(); // trả về đường dẫn tuyệt đối của thư mục hiện tại

dotenv.config();
// console.log(process.env.MONGO_URI); // publicize key 
const app = express();
const PORT = process.env.PORT || 3000;
// connectDB();

//middleware
if(process.env.NODE_ENV !== "production"){// nghĩa là nếu 2 bên domain khác nhau thì mới chạy cors còn giống thì không cần chạy
    //sau khi code gần xong trang homepage cần cors để cho phép kết nối backend và frontend vẫn thỏa bảo mật
    app.use (cors({
        origin: "http://localhost:5173",
    }))
    // vị trí đặt các middleware cũng rất quan trọng phải để cors này ở đầu
    //để backend này cho phép kết nối với frontend ngay từ đầu 
}


// middleware để có thể xem được định dạng req.body
app.use(express.json()); //middleware của Express dùng để: Parse (chuyển đổi) JSON từ body của request thành object JavaScript.
// nếu không có thì không đọc được trong console.log 
// middleware là Hàm chạy giữa lúc request đi vào server và trước khi đến route handler.
// Request → Middleware → Route → Response
// vì Express chạy middleware theo thứ tự từ trên xuống. nên middleware phải đặt trước router 
// bình thường json không đọc được, cần middleware này để đọc được

//rated middleware
app.use(rateLimiter)


//simple custom middleware
app.use((req, res, next) => {
    console.log(`Req method: ${req.method} , Req URL: ${req.url}`); // middleware
    next(); // hàm next làm middleware xử lý trước khi chạy route handler
})



//thay vì mỗi routes phải /api/notes thì chỉ cần gọi dòng này 
app.use("/api/notes", notesRoutes);
// khi gọi dòng này thì mỗi routes có sẵn luôn /api/notes rồi chỉ định nghĩa tiếp thôi

//lúc này có thể thêm vài route và viết hàm trong routes, controllers
// app.use("/api/product", productRoutes);



if(process.env.NODE_ENV === "production"){
    // express.static là middleware để phục vụ file tĩnh (không thay đổi theo request: css,js, image, font, file build react)
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    // dist là file frontend tạo sau build tạo file gọn cho deploy

    // app.get("*", (req, res) => {
    //     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    // }); // lấy all get request nghĩa là các file khác thì đưa nó vào index.html trong frontend
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    }); // lấy all get request 

}
// Flow:
// Request đến Node.
// Không match API.
// Không match static.
// Match app.get("*").
// Trả index.html.
// React load.
// React Router đọc URL.
// Render page.

// Thứ tự thực tế
// CORS (nếu dev)
// express.json()
// rateLimiter
// custom middleware log
// /api/notes routes
// static frontend (production)
// fallback "*"
// response

// trong thực tế viết vậy vì nếu DB không chạy được thì chạy app cũng chỉ tốn tài nguyên
connectDB().then(()=>{ 
    app.listen(PORT, () => 
        console.log("Server started on port" + PORT)); 
})


//cuối cùng nên để tất cả file mình code vào mục src, ta cần sửa lại trong package.json về thư mục chạy

