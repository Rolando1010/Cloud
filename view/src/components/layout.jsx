import styles from "../styles/layout.module.css";
import Menu from "./menu";
import ToastContainer from "./toast";

const Layout = ({ children }) => <>
    <Menu/>
    <main className={styles.container}>
        {children}
        <ToastContainer/>
    </main>
</>;

export default Layout;