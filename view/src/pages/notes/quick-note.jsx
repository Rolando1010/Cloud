import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import styles from "../../styles/notes.module.css";
import requests from "../../utils/requests";

const QuickNote = () => {
    const [text, setText] = useState("");

    const saveQuickNote = useDebouncedCallback(newText => {
        if(newText) requests.put("/quick-note", { text: newText });
    }, 2000);

    const handleChange = newText => {
        setText(newText);
        saveQuickNote(newText);
    }

    useEffect(() => {
        requests.get("/quick-note").then(({ text }) => setText(text));
    }, []);

    return (
        <textarea
            value={text}
            onChange={event => handleChange(event.target.value)}
            className={styles.noteText}
        ></textarea>
    );
}

export default QuickNote;