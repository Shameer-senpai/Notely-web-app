import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setNotes(data);
  };

  const saveNote = async () => {
    if (!text || !date) return;

    if (editingId) {
      await fetch(`${API}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, date })
      });
      setEditingId(null);
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, date })
      });
    }

    setText("");
    setDate("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  const toggleComplete = async (note) => {
    await fetch(`${API}/${note.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !note.completed })
    });
    fetchNotes();
  };

  const startEdit = (note) => {
    setText(note.text);
    setDate(note.date);
    setEditingId(note.id);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Notely</h1><hr></hr><br></br>

        {/* Input Section */}
        <div className="form">
          <input
            type="text"
            placeholder="Write your note..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button className="primary-btn" onClick={saveNote}>
            {editingId ? "Save Changes" : "Add Note"}
          </button>
        </div>

        {/* Notes Section */}
        <div className="notes-box">
          {notes.length === 0 && (
            <p className="empty">No notes added yet</p>
          )}

          {notes.map(note => (
            <div
              key={note.id}
              className={`note-row ${note.completed ? "completed" : ""}`}
            >
              <input
                type="checkbox"
                checked={note.completed}
                onChange={() => toggleComplete(note)}
              />

              <div className="note-info">
                <p>{note.text}</p>
                <span>{note.date}</span>
              </div>

              <div className="actions">
                <button className="edit" onClick={() => startEdit(note)}>
                  Edit
                </button>
                <button className="delete" onClick={() => deleteNote(note.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
