import { useState } from "react";
import "./QuickNote.css";

function QuickNote() {
    const [note, setNote] = useState("");

    return (
        <div className="note-section">
            <h3 className="note-title">Quick Note</h3>
            
            <input 
                className="note-input"
                type="text"
                placeholder="Scrie ceva aici..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />

            {note && (
                <div className="preview-container">
                    <p className="live-note-label">Previzualizare:</p>
                    <p className="live-note-text">{note}</p>
                </div>
            )}
        </div>
    );
}

export default QuickNote;