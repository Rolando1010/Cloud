import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteForm from "../../components/note-form";
import { errorToast, successToast } from "../../components/toast";
import requests from "../../utils/requests";

const NewNote = () => {
    const [note, setNote] = useState({ title: "", description: "", code: "" });
    const navigate = useNavigate();

    const createNote = () => {
        requests.post("/notes", note).then(() => {
            successToast("Note created");
            navigate("/notes");
        }).catch(() => errorToast("Creation note error"));
    }

    return (
        <NoteForm
            note={note}
            onUpdateNote={setNote}
            onSubmit={createNote}
        />
    );
}

export default NewNote;