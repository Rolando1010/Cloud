import { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/notes.module.css";
import Button from "../../components/button";
import Modal from "../../components/modal";
import QuickNote from "./quick-note";
import ListNotes from "./list";

const Notes = () => {
    const quickNoteRef = useRef();

    return (<>
        <div className={styles.buttonsContainer}>
            <Link to="/notes/new" className={styles.newNoteLink}>Añadir Nota</Link>
            <Button type="primary" onClick={() => quickNoteRef.open()}>Nota rápida</Button>
        </div>
        <ListNotes/>
        <Modal title="Quick Note" modalRef={quickNoteRef}>
            <QuickNote/>
        </Modal>
    </>);
}

export default Notes;