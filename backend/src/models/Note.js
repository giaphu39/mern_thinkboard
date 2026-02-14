import mongoose from "mongoose";

//1 create schema
// 2 model based off of that schema

// tạo khung từng note có nội dung gì 
const noteSchema = new mongoose.Schema(
  {
    title:{
    type: String,
    required: true
  },
  content:{
    type: String,
    required: true
  }
},
  { // 1 object khác có khung là loại thời gian
    timestamps: true // gồm có createdAt và updatedAt 
  }
)

const Note = mongoose.model("Note", noteSchema);
export default Note


// Schema = bản thiết kế (blueprint) của dữ liệu trong MongoDB.
// Nó trả lời câu hỏi:
// “Một document trong collection này gồm những field nào? Kiểu gì? Bắt buộc hay không?”
// nếu không có thì Muốn lưu gì cũng được, không kiểm soát.
// loạn nên cần có để 
// ✅ Chuẩn hóa dữ liệu
// ✅ Tránh lỗi
// ✅ Dễ maintain
// ✅ Dễ scale

// Model = công cụ để thao tác với database dựa trên Schema.
// Nếu:
// Schema = bản thiết kế nhà 🏗️
// Model = đội xây dựng + công cụ thi công 🔨
// Schema: Quy định dữ liệu trông ra sao
//    ↓
// Model: Code thao tác dữ liệu
//    ↓
// MongoDB: Lưu thật
