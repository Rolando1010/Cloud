import { useState, useRef } from "react";
import useFiles from "../../hooks/useFiles";
import styles from "../../styles/files.module.css";
import Button from "../../components/button";
import Modal from "../../components/modal";
import FileInput from "../../components/file-input";
import { errorToast, successToast } from "../../components/toast";
import Input from "../../components/input";

const Addition = ({ updateContentDirectory }) => {
    const { uploadFiles, createFolder } = useFiles();
    const uploadFilesRef = useRef({});
    const createFolderRef = useRef({});
    const [files, setFiles] = useState([]);
    const folderNameRef = useRef();

    const handleOnUploadFiles = newFiles => {
        setFiles(previousFiles => previousFiles.filter(pf => !newFiles.map(nf => nf.name).includes(pf.name)).concat(newFiles));
    }

    const handleFileUpload = () => {
        uploadFiles(files).then(({files: sentFiles}) => {
            sentFiles.forEach(({ success, file, message }) => {
                if(success){
                    successToast(`file ${file} successfully uploaded`);
                } else {
                    errorToast(message);
                }
            });
            setFiles([]);
            uploadFilesRef.close();
            updateContentDirectory();
        });
    }

    const handleFolderCreation = (event) => {
        event.preventDefault();
        const folderName = folderNameRef.current.value;
        createFolder(folderName).then(({ success, message }) => {
            if(success){
                successToast(`folder ${folderName} created successfully`);
            } else {
                errorToast(`folder ${folderName} ${message}`);
            }
            folderNameRef.current.value = "";
            createFolderRef.close();
            updateContentDirectory();
        });
    }

    const discardFile = (fileName) => () => {
        setFiles(previousFiles => previousFiles.filter(pf => pf.name !== fileName));
    }

    return (<>
        <div className={styles.buttonsContainer}>
            <Button type="primary" onClick={() => uploadFilesRef.open()}>Upload files</Button>
            <Button type="primary" onClick={() => createFolderRef.open()}>Create folder</Button>
        </div>
        <Modal
            title="Upload files"
            modalRef={uploadFilesRef}
        >
            <FileInput onUploadFiles={handleOnUploadFiles}/>
            <ul className={styles.filesList}>
                {files.map((file, index) =>
                    <li key={`uploaded-file-${index}`}>
                        {file.name}
                        <button onClick={discardFile(file.name)}>
                            <i className="fas fa-times"></i>
                        </button>
                    </li>
                )}
            </ul>
            <center>
                <Button type="primary" onClick={handleFileUpload}>Upload</Button>
            </center>
        </Modal>
        <Modal
            title="Create folder"
            modalRef={createFolderRef}
        >
            <form onSubmit={handleFolderCreation}>
                <Input label="Folder name" autoFocus={true} inputRef={folderNameRef}/>
                <center>
                    <Button type="primary">Create</Button>
                </center>
            </form>
        </Modal>
    </>);
}

export default Addition;