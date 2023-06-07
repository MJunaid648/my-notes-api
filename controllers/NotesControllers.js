import Note from "../models/notesModel.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    if (!notes) {
      return res.status(404).send("No notes found");
    } else {
      res.status(200).send(notes);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id });

    if (note) {
      // Document found, return it
      res.status(200).send(note);
    } else {
      // Document not found
      res.status(404).send({ message: "Document not found" });
    }
  } catch (error) {
    // Error occurred while retrieving the document
    res.status(500).send({ message: "Internal server error" });
  }
};

export const setNote = async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      desc: req.body.desc,
      time: req.body.time,
      date: req.body.date,
    });
    const result = await note.save();
    res.status(200).send(result);
  } catch (ex) {
    for (let field in ex.errors) {
      console.log(ex.errors[field].message);
    }
    res.status(500).send(ex.message);
  }
};

export const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: req.body.title,
          desc: req.body.desc,
          time: req.body.time,
          date: req.body.date,
        },
      }
    );

    res.status(200).send("note updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedNote = await Note.deleteOne({ _id: id });

    if (deletedNote.deletedCount === 0) {
      return res.status(404).send("Note with the given id not found");
    } else {
      res.status(200).send("Note successfully deleted");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
