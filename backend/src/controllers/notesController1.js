
export function getAllNotes(req, res){
  res.status(200).send("You just fetch the notes");
}

export const addNewNote = (req, res) => {
  res.status(201).json({
    message: "Add new note success!"
  });
}

export const updateNote = (req, res) => {
  res.status(200).json({
    message: "Update note success!"
  });
}

export const deleteNote = (req, res) => {
  res.status(200).json({
    message: "Delete note success!"
  });
}