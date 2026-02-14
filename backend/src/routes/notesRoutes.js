import express from "express";
import { getAllNotes,getNoteById, addNewNote, updateNote, deleteNote } from "../controllers/notesController.js";
const router = express.Router();

router.get("/", getAllNotes);
// đường dẫn truy cập: localhost:3000/api/notes
router.get("/:idNote",getNoteById)
router.post("/", addNewNote)
// vấn đề là mỗi router lại có nội dung nhiều trong đó khó quản lý, từng router cần tách thành file riêng để viết code riêng
router.put("/:id", updateNote)

router.delete("/:id", deleteNote)
export default router;