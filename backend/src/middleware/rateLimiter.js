import ratelimit from "../config/upstash.js";


const rateLimiter = async (req, res, next) => {
  // per user => 
  try {
    const { success } = await ratelimit.limit("my-limit-key"); // ở đây cần đặt userid nhưng cần cài đặt authentication

    if (!success) {
      return res.status(429).json({ message: "Rate limit exceeded, too many requests, please try again later" });
    }
    next();

  } catch (error) {
    console.error("Error in rateLimiter middleware", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

export default rateLimiter

//test thì dùng lệnh getAllNotes 6 lần sẽ hiện lỗi này