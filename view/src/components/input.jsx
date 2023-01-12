import styles from "../styles/input.module.css";

const Input = ({ label, type, autoFocus, inputRef }) =>
    <label className={styles.input}>
        <span>{label}</span>
        <input
            type={type}
            autoFocus={autoFocus}
            ref={inputRef}
        />
    </label>

export default Input;