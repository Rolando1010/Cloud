import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button";
import requests from "../../utils/requests";
import { errorToast, successToast } from "../../components/toast";
import NoteForm from "../../components/note-form";

const Note = () => {
    const { noteId } = useParams();
    const [note, setNote] = useState({ id: noteId, title: "", description: "", date: ""});
    const [error, setError] = useState();
    const navigate = useNavigate();

    const updateNote = event => {
        event.preventDefault();
        const { title, description } = note;
        requests.put(`/notes/${noteId}`, { title, description })
            .then(() => successToast("Nota actualizada"))
            .catch(() => errorToast("Error en actualización"))
    }

    const deleteNote = () => {
        requests.delete(`/notes/${noteId}`)
            .then(({ success }) => {
                if(success){
                    successToast("Nota actualizada");
                    navigate("/notes");
                } else {
                    errorToast("Error en actualización")
                }
            }).catch(() => errorToast("Error en actualización"));
    }

    useEffect(() => {
        requests.get(`/notes/${noteId}`).then(({ success, message, note }) => {
            if(success) setNote(note);
            else setError(message);
        });
    }, []);

    return (error ? 
        <h4>{error}</h4>
    :
        <NoteForm
            note={note}
            onUpdateNote={setNote}
            onSubmit={updateNote}
            actions={<Button type="light" onClick={deleteNote}>Eliminar</Button>}
        />
    );
}

export default Note;