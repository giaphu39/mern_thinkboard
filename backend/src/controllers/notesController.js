import Note from "../models/Note.js";

export async function getAllNotes(req, res){ // async trả về promise.resolve(return result) hoặc promise.reject(return error)
  try{ // khi không cần dùng tham số req thì đặt _ tiết kiệm bộ nhớ
    // Đợi MongoDB query xong
    // Khi có dữ liệu rồi mới chạy tiếp
    // const notes = await Note.find(); // cấu trúc Note.find(filter, projection, options) 
    const notes = await Note.find().sort({createAt: -1}); // sort theo thời gian tạo -1 là latest
    res.status(200).json(notes);
  }catch(err){
    // res.status(500).console.log(err);
    console.error("Error fetching notes", err);
    res.status(500).json({message: "interal server error"});
  }
}

export async function getNoteById(req, res){
  try{
    const note = await Note.findById(req.params.idNote); // đọc hiểu chỗ này để hiểu params hơn
    if(!note){
      return res.status(404).json({message: "Note not found"});
    }
    res.status(200).json(note);
  }catch(err){
    console.error("Error fetching note", err);
    res.status(500).json({message: "interal server error"});
  }
}

export async function addNewNote(req, res){ // dùng postman để test add vào và check mongodb data exploratory
  try{ // post request
    const {title, content} = req.body;
    // console.log(title, content);
    const newNote = new Note({title, content}); // title: title giống nhau nên chỉ cần ghi 1 cái là được
    const savedNote = await newNote.save()
    res.status(201).json({message: "Note created successfully", content : savedNote});
  }catch(err){
    console.error("Error creating note", err);
    res.status(500).json({message: "interal server error"});
  }
}

export async function updateNote (req, res) { // lệnh PUT cần biết id của 1 note trước đó đã tạo 
  try{
    const {title, content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});
    // Sau khi update xong, trả về document mới nhất. -> new true nghĩa là vẫn thay đổi nhưng chưa trả về cho console.log in ra 
    if(!updatedNote){ // nó sẽ kiểm tra đúng định dạng 1 id (ObjectId đúng số lượng từ) mới chạy vào đây vd 1 id sai: 698d7fd09d787d167c137dc1 
      return res.status(404).json({message: "Note not found"});
    }
    res.status(200).json({
      message: "Update note success!", content: updatedNote
    });
  }
  catch(err){
    res.status(500).json({message: "interal server error"}, err);
  }
}


export async function deleteNote (req, res) {
  try{
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if(!deletedNote){
      return res.status(404).json({message: "Note not found"});
    }
    res.status(200).json({
      message: "Delete note success!", content: deletedNote
    });
  }
  catch(err){
    res.status(500).json({message: "interal server error"}, err);
  }
}