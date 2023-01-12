import { useState, useEffect } from "react";
import usePath from "./usePath";
import requests from "../utils/requests";

const useDirectory = () => {
    const path = usePath();
    const [contentDirectory, setContentDirectory] = useState({ directories: [], files: [] });
    const [message, setMessage] = useState("");

    const updateContentDirectory = (newPath) => {
        requests.get(`/files?path=${newPath || path}`).then(({directories, files, message}) => {
            setContentDirectory({directories, files});
            setMessage(message);
        });
    }

    useEffect(updateContentDirectory, [path]);

    return {
        contentDirectory,
        message,
        updateContentDirectory
    };
}

export default useDirectory;