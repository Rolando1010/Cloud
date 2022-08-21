import styles from "../../styles/pages/home.module.css";
import Directory from "./directory";
import Path from "./path";
import Addition from "./addition";
import useDirectory from "../../hooks/useDirectory";

const Home = () => {
    const {
        contentDirectory: {directories, files},
        message,
        updateContentDirectory
    } = useDirectory();

    return (
        <Container>
            <Path/>
            <Addition updateContentDirectory={updateContentDirectory}/>
            <Directory
                directories={directories}
                files={files}
                message={message}
                updateContentDirectory={updateContentDirectory}
            />
        </Container>
    );
}

const Container = ({ children }) =>
    <main className={styles.container}>
        {children}
    </main>

export default Home;