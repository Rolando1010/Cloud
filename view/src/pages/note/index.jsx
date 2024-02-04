import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button";
import requests from "../../utils/requests";
import { errorToast, successToast } from "../../components/toast";
import NoteForm from "../../components/note-form";

const Note = () => {
    const { noteId } = useParams();
    const [note, setNote] = useState({id: noteId, title: "", description: "", date: "", encoded: false, code: ""});
    const [error, setError] = useState();
    const navigate = useNavigate();

    const updateNote = event => {
        event.preventDefault();
        const { title, description, code } = note;
        requests.put(`/notes/${noteId}`, { title, description, code })
            .then(({success, message}) => {
                if(success) successToast(`Note updated ${message ? ` (${message})` : ""}`);
                else errorToast(message);
            }).catch(() => errorToast("Update failed"))
    }

    const deleteNote = () => {
        requests.delete(`/notes/${noteId}`)
            .then(({ success }) => {
                if(success){
                    successToast("Note update");
                    navigate("/notes");
                } else errorToast("Update failed")
            }).catch(() => errorToast("Update failed"));
    }

    const decodeNote = () => {
        requests.post(`/notes/${noteId}`, {code: note.code}).then(({success, note: newNote}) => {
            if(success) setNote({...note, description: newNote.description});
        });
    }

    useEffect(() => {
        requests.get(`/notes/${noteId}`).then(({ success, message, note }) => {
            if(success) setNote({...note, code: ""});
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
            actions={<>
                {note.encoded &&
                    <Button type="primary" onClick={decodeNote}>Decode</Button>
                }
                <Button type="light" onClick={deleteNote}>Delete</Button>
            </>}
        />
    );
}

export default Note;