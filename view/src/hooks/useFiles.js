import usePath from "./usePath";
import requests from "../utils/requests";
import { API_URL } from "../utils/constants";

const useFiles = () => {
    const path = usePath();

    const uploadFiles = files => {
        return new Promise(resolve => {
            const formData = new FormData();
            files.forEach(file => {
                formData.append("files", file);
            });
            requests.post(`/files?path=${path}`, formData, true).then(resolve);
        });
    }

    const createFolder = folderName => 
        requests.post(`/directories?path=${path}`, {directory: folderName});

    const deleteFile = (fileName) => requests.delete(`/files?path=${path}&file=${fileName}`);

    return {
        uploadFiles,
        createFolder,
        deleteFile
    }
}

export default useFiles;