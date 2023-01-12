import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/notes.module.css";
import requests from "../../utils/requests";

const ListNotes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        requests.get("/notes").then(({ notes }) => setNotes(notes));
    }, []);
    
    return (
        <ul className={styles.listNotes}>
            {notes.map(({ id, title, date }, index) =>
                <li key={`note-${index}`} className={styles.note}>
                    <Link to={`/notes/${id}`}>
                        <div>
                            <span>{title}</span>
                            <span>{date}</span>
                        </div>
                    </Link>
                </li>
            )}
        </ul>
    );
}

export default ListNotes;