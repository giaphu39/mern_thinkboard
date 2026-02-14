const express = require("express");
const app = express();
const port = 3000;


//API hiểu như là người trung gian để gửi và nhận du liệu giữa client và server
// cần trung gian vì nếu tới thẳng server thì người dùng có thể phá hủy DB dễ dàng
//REST API gồm get post put delete
app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.status(200).send("Hello World!");

});
app.get("/test", (req, res) => {
  res.json({
    message: "Hello World!" // mỗi lần thay đổi từ trong đây phải chạy lại cmd trừ khi dùng nodemon
    //chạy nodemon server.js thay vì node server.js
  });
});

app.post("/addPage", (req, res) => { // trang này không hiển thị thành công 
  //để quan sát lỗi thì f12 rồi network rồi all sẽ thấy lỗi addPage 404
  res.status(201).send("Add new page success!"); // học các dạng http status code
})

app.post("/api/notes", (req, res) => {
  res.status(201).json({
    message: "Add new note success!"
  });
})

app.put("/api/notes/:id", (req, res) => {
  res.status(200).json({
    message: "Update note success!"
  });
})
// http://localhost:3000/api/notes/1
app.delete("/api/notes/:id", (req, res) => {
  res.status(200).json({
    message: "Delete note success!"
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})


// Endpoint là một địa chỉ cụ thể (URL/URI) dùng để client (frontend, app, phần mềm khác) gửi request và nhận response từ server.
// Nói đơn giản: Endpoint = URL + HTTP methods
// 👉 Endpoint = “điểm tiếp xúc” giữa client và server.
// việc trên gọi là routing ta nên viết thành các file trong mục routes thay vì viết thẳng như trên 

