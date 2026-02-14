import mongoose from "mongoose";
export const connectDB = async() => {
  try{
    // điền vào khóa kết nối cơ sở dữ liệu, đây là authentication
    // nhưng mà cách này thì không đúng vì dữ liệu quan trọng string khóa này người dùng cũng thấy được
    //đặt nó vào env
    // đoạn string code trên sẽ được sửa vài chỗ để làm mẫu thôi
    // await mongoose.connect("mongodb+srv://TranPhu39:01020304050607@cluster0.cvcxwk8.mongodb.net/notes_db?appName=Cluster0");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully");
  }
  catch(error){
    console.log("Error connecting to MongoDB", error);
    console.log("Error connecting to MongoDB");
    process.exit(1); //exit with failure
    // process.exit(0) //exit with success
  }
}

// nhớ link key trong .env không có dấu cách