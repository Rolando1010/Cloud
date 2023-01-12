import Directory from "./directory";
import Path from "./path";
import Addition from "./addition";
import useDirectory from "../../hooks/useDirectory";

const Files = () => {
    const {
        contentDirectory: {directories, files},
        message,
        updateContentDirectory
    } = useDirectory();

    console.log(directories, files);

    return (<>
        <Path/>
        <Addition updateContentDirectory={updateContentDirectory}/>
        <Directory
            directories={directories}
            files={files}
            message={message}
            updateContentDirectory={updateContentDirectory}
        />
    </>);
}

export default Files;