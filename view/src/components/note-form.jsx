import styles from "../styles/note-form.module.css";
import Button from "./button";

const NoteForm = ({ note, onUpdateNote, onSubmit, actions }) => {
    const handleChange = key => event => {
        onUpdateNote({...note, [key]: event.target.value});
    }

    return (<>
        <p className={styles.date}>{note.date}</p>
        <form className={styles.noteForm} onSubmit={onSubmit}>
            <input placeholder="Title" value={note.title} onChange={handleChange("title")}/>
            <textarea placeholder="Description" value={note.description} onChange={handleChange("description")}></textarea>
            {(!note.id || note.encoded) &&
                <input type="text" onChange={handleChange("code")} placeholder="Code"/>
            }
       </form>
        <div className={styles.actions}>
            <Button type="primary" onClick={onSubmit}>Save</Button>
            {actions}
        </div>
    </>);
}

export default NoteForm;