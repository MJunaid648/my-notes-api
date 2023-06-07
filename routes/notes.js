import express from "express";
import {
  getNotes,
  getNoteById,
  setNote,
  updateNote,
  deleteNote,
} from "../controllers/NotesControllers.js";

const router = express.Router();

router.get("/", getNotes);

router.get("/:id", getNoteById);

router.post("/", setNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;