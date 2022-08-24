import "./styles.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { URL } from "../../services/api";
import Open from "../../Assets/Icons/AddHive/open.svg";
import NotesIcon from "../../Assets/Icons/notes.png";

interface IProps {
  selectedHive: number | undefined;
  token: string;
}

interface INote {
  note_id: number;
  note: string;
  added_by: string;
  added_date: string;
}

export const HiveNotes = ({ token, selectedHive }: IProps) => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [newNote, setNewNote] = useState<string>();

  const [showForm, setShowForm] = useState(false);

  const updateShowForm = () =>
    setShowForm((currentShowForm) => !currentShowForm);

  const updateNewNote = (event: ChangeEvent<HTMLInputElement>) =>
    setNewNote(event.target.value);

  const fetchData = async () => {
    const req = await fetch(URL + "/get-hive-notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ hive_id: selectedHive }),
    });

    const res = await req.json();

    setNotes(res);
  };

  useEffect(() => {
    if (selectedHive) {
      fetchData();
    }
  }, [selectedHive, notes]);

  const handleAddNote = async () => {
    const inputElement = document.querySelector(
      ".add-hive-input"
    ) as HTMLInputElement;

    inputElement.value = "";

    const req = await fetch(URL + "/add-hive-note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ hive_id: selectedHive, note: newNote }),
    });

    const { error } = await req.json();

    if (error) return alert(error);

    return fetchData();
  };

  const handleRemoveNote = async (note_id: number) => {
    const req = await fetch(URL + "/remove-hive-note", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ note_id: note_id, hive_id: selectedHive }),
    });

    const { error } = await req.json();

    if (error) return alert(error);

    return fetchData();
  };

  return (
    <main className="hive-notes-main">
      <h1 className="charts-title">
        <img src={NotesIcon} alt="Notes" />
        {`Hive #${selectedHive} Notes`}
      </h1>

      <div className="notes-container">
        {notes.length ? (
          notes.map((hiveNote) => {
            const { note_id, note, added_by, added_date } = hiveNote;

            return (
              <div
                className="shadow-primary"
                key={`note_${note_id}`}
                id={`note_${note_id}`}
              >
                <h3>{note}</h3>
                <p>
                  Added by: <span>{added_by}</span>
                </p>
                <p>
                  Added at: <span>{new Date(added_date).toLocaleString()}</span>
                </p>

                <button
                  className="shadow-primary"
                  onClick={() => handleRemoveNote(note_id)}
                >
                  Remove note
                </button>
              </div>
            );
          })
        ) : (
          <p>There are no notes.</p>
        )}
      </div>

      <div className="add-hive-container shadow-primary">
        <div className="add-hive-container-header">
          <h2>Add Note</h2>
          <img
            className={showForm ? "close" : ""}
            src={Open}
            alt={showForm ? "Close" : "Open"}
            onClick={updateShowForm}
          />
        </div>

        {showForm ? (
          <div className="add-hive-container-inputs">
            <input
              className="add-hive-input shadow-primary"
              type="text"
              placeholder={`Add a note to hive ${selectedHive}`}
              onChange={updateNewNote}
            />

            <button className="primary-btn" onClick={handleAddNote}>
              Add note
            </button>
          </div>
        ) : null}
      </div>
    </main>
  );
};
