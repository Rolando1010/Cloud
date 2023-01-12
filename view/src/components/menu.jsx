import { Link } from "react-router-dom";
import styles from "../styles/menu.module.css";
import { STATIC_IMAGES_URL } from "../utils/constants";

const Menu = () =>
    <header className={styles.menu}>
        <section className={styles.title}>
            <img src={STATIC_IMAGES_URL + "icon.png"}/>
            Cloud
        </section>
        <section className={styles.linksContainer}>
            <Link to="/files">Files</Link>
            <Link to="/notes">Notes</Link>
        </section>
    </header>

export default Menu;