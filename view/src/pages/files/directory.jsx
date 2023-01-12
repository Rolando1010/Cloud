import { useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/files.module.css";
import usePath from "../../hooks/usePath";
import useFiles from "../../hooks/useFiles";
import { errorToast, successToast } from "../../components/toast";
import { FILES_URL } from "../../utils/constants";

const Directory = ({ directories, files, message, updateContentDirectory }) => {
    return (
        <ul className={styles.directoryList}>
            {message &&
                <p className={styles.message}>{message}</p>
            }
            {!message && (!directories.length && !files.length) &&
                <p className={styles.message}>empty directory</p>
            }
            {directories.map((directory, index) =>
                <DirectoryElement
                    key={`directory-${index}`}
                    file={directory}
                    isDirectory={true}
                    updateContentDirectory={updateContentDirectory}
                />
            )}
            {files.map((file, index) =>
                <DirectoryElement
                    key={`file-${index}`}
                    file={file}
                    updateContentDirectory={updateContentDirectory}
                />
            )} 
        </ul>
    );
}

const DirectoryElement = ({ file, isDirectory, updateContentDirectory }) => {
    const path = usePath();
    const { deleteFile } = useFiles();

    const handleFileDelete = (file) => () => {
        if(confirm(`Delete ${file}?`)){
            deleteFile(file).then(({ success, message }) => {
                if(success){
                    updateContentDirectory();
                    successToast(`${file} deleted`);
                }else{
                    errorToast(message);
                }
            }).catch(() => errorToast("Error in delete"));
        }
    }

    const getDirectoryPath = directory => {
        const url = `/files?path=${path}`;
        if(path.at(-1) === "/") return url + directory;
        return url + "/" + directory;
    };

    const fileURL = useMemo(() =>
        FILES_URL +
        (path[0] === "/" ? path.slice(1) : path) +
        (path.at(-1) === "/" ? "" : "/") +
        file
    , [file]);

    const Container = ({ children }) => isDirectory ? (
        <Link to={getDirectoryPath(file)}>
            {children}
        </Link>
    ) : (
        <a href={fileURL} target="_blank">{children}</a>
    );

    const Icon = () => <i className={isDirectory ? "fas fa-folder-open" : "fas fa-file-alt"}></i>;

    return (
        <li>
            <Container>
                <Icon/>
                {file}
            </Container>
            <div>
                {!isDirectory && 
                    <a href={fileURL} download={file}>
                        <i title="Download" className="fas fa-download"></i>
                    </a>
                }
                <button onClick={handleFileDelete(file)}>
                    <i title="Delete" className="fas fa-trash"></i>
                </button>
            </div>
        </li>
    );
}

export default Directory;