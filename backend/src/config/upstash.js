import { Ratelimit } from "@upstash/ratelimit"; // lưu ý các tên khi import import sai là phải sửa rất nhiều chỗ
import {Redis} from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config();

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  // limiter: RateLimit.fixedWindow(5, "1 h"), //Đếm request trong một khung thời gian cố định, Reset sau mỗi khoảng
  limiter: Ratelimit.slidingWindow(100, "50 s"),
  // tạo ratelimit cho 100 requests mỗi 50 seconds và tính theo 20s gần nhất trượt thời gian dần chứ không cố định từng khoảng giới hạn bao nhiêu
}); // thực tế thì nên cho 100 requests mỗi 60 s

export default ratelimit;



// | Thuộc tính | Ý nghĩa                |
// | ---------- | ---------------------- |
// | redis      | nơi lưu số lần request |
// | limiter    | thuật toán rate limit  |




// Upstash là một nền tảng serverless data infrastructure, chủ yếu cung cấp:

// Serverless Redis

// Serverless Kafka

// HTTP-based API (không cần giữ TCP connection như Redis truyền thống)

// Phù hợp cho:

// Vercel

// Cloudflare Workers

// Serverless Functions

// Edge Functions
// 2️⃣ Tại sao đặt trong thư mục config?

// Vì đây là:

// Cấu hình hạ tầng (infrastructure config)

// Không phải business logic

// Dùng lại ở nhiều nơi (middleware, route, auth...)
// Config = nơi khởi tạo các service bên ngoài:

// DB connection

// Redis

// Cloud storage

// Rate limit

// OAuth

// Giữ code sạch, tách biệt dependency.

// Đây là tư duy clean architecture, sau này em làm AI backend scale lớn sẽ cực kỳ quan trọng.

// 4.3 Token Bucket (không có sẵn ở đây nhưng phổ biến)

// Cơ chế:

// Có một "xô" chứa token

// Mỗi request lấy 1 token

// Token được refill theo thời gian

// Dùng nhiều trong API lớn (Google API, AWS API)