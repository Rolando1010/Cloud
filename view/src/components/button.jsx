import styles from "../styles/button.module.css";

const Button = ({ children, type, onClick }) =>
    <button
        onClick={onClick}
        className={`${styles.button} ${styles[type]}`}
    >{children}</button>

export default Button;