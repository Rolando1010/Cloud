import { Link } from "react-router-dom";
import styles from "../styles/components/menu.module.css";
import { STATIC_IMAGES_URL } from "../utils/constants";

const Menu = () =>
    <header className={styles.menu}>
        <Link to="/">
            <img src={STATIC_IMAGES_URL + "icon.png"}/>
            Cloud
        </Link>
    </header>

export default Menu;