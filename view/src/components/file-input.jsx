import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styles from "../styles/file-input.module.css";

const getBorderColor = (isDragAccept, isFocused) => {
    if (isDragAccept) return "#00e676";
    if (isFocused) return "#2196f3";
    return "#ffffff";
}

const FileInput = ({ onUploadFiles }) => {
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        acceptedFiles        
    } = useDropzone();

    useEffect(() => {
        onUploadFiles(acceptedFiles);
    }, [acceptedFiles]);

    return (
        <div>
            <div
                className={styles.container}
                {...getRootProps({style: {borderColor: getBorderColor(isDragAccept, isFocused)}})}
            >
                <input {...getInputProps()}/>
                <p>Drag and drop files or click to select them</p>
            </div>
        </div>
    );
}

export default FileInput;