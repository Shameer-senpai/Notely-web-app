const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "notes.json");

/* ---------- Helpers ---------- */
function readNotes() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]");
  }

  const data = fs.readFileSync(DATA_FILE, "utf-8").trim();
  if (!data) return [];

  return JSON.parse(data);
}

function writeNotes(notes) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
}

/* ---------- Routes ---------- */
app.get("/notes", (req, res) => {
  res.json(readNotes());
});

app.post("/notes", (req, res) => {
  const notes = readNotes();

  const newNote = {
    id: Date.now(),
    text: req.body.text,
    date: req.body.date,
    completed: false
  };

  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

app.put("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const notes = readNotes();

  const updatedNotes = notes.map(note =>
    note.id === id ? { ...note, ...req.body } : note
  );

  writeNotes(updatedNotes);
  res.json({ message: "Updated" });
});

app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const notes = readNotes().filter(n => n.id !== id);
  writeNotes(notes);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
