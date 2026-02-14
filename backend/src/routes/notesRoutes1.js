import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("You just fetch the notes");
});
// đường dẫn truy cập: localhost:3000/api/notes
router.post("/", (req, res) => {
  res.status(201).json({
    message: "Add new note success!"
  });
})
// vấn đề là mỗi router lại có nội dung nhiều trong đó khó quản lý, từng router cần tách thành function riêng để viết code riêng
router.put("/:id", (req, res) => {
  res.status(200).json({
    message: "Update note success!"
  });
})

router.delete("/:id", (req, res) => {
  res.status(200).json({
    message: "Delete note success!"
  });
})
export default router;