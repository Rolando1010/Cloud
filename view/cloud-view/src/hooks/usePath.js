import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const usePath = () => {
    const { search } = useLocation();

    const path = useMemo(() => {
        const params = new URLSearchParams(search);
        const path = params.get("path") || "";
        if(path[0] !== "/") return "/" + path;
        return path;
    }, [search]);

    return path;
}

export default usePath;