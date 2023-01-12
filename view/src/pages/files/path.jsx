import { useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import usePath from "../../hooks/usePath";
import styles from "../../styles/files.module.css";

const Path = () => {
    const path = usePath();
    const inputRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const path = inputRef.current.value;
        navigate(`/?path=${path}`);
    }

    useEffect(() => {
        inputRef.current.value = path
    }, [path]);

    const previousDirectory = () => {
        const directories = path.split("/");
        const previousPath = directories.slice(0, -1).join("/") || "/";
        return `/files?path=${previousPath}`;
    }

    return (
        <section className={styles.pathContainer}>
            <Link to={previousDirectory()}>
                <i className="fas fa-arrow-left"></i>
            </Link>
            <form className={styles.pathForm} onSubmit={handleSubmit}>
                <input ref={inputRef}/>
            </form>
        </section>
    );
}

export default Path;