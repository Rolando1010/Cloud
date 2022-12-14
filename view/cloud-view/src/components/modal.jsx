import { useState, useEffect } from "react";
import Button from "./button";
import styles from "../styles/components/modal.module.css";

const Modal = ({ modalRef = {}, title, footer, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => {
        setIsOpen(true)
        document.body.style.overflowY = "hidden";
    }

    const close = () => {
        document.body.style.overflowY = "auto";
        setIsOpen(false);
    }

    useEffect(() => {
        modalRef.open = open;
        modalRef.close = close;
    }, []);

    if(!isOpen) return <></>;
    return (
        <div className={styles.modal}>
            <section>
                <header>
                    {title || <p></p>}
                    <button onClick={close}>
                        <i className="fas fa-times"></i>
                    </button>
                </header>
                <main>
                    {children}
                </main>
                <footer>
                    {footer}
                    <Button type="light" onClick={close}>Close</Button>
                </footer>
            </section>
        </div>
    );
}

export default Modal;