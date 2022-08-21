const IS_DEV_MODE = import.meta.env.DEV;

const API_URL = IS_DEV_MODE ? "http://127.0.0.1:8000" : "";

const STATIC_IMAGES_URL = API_URL + "/static/img/";

const FILES_URL = IS_DEV_MODE ? "/assets/" : API_URL + "/media/";

export {
    API_URL,
    STATIC_IMAGES_URL,
    FILES_URL
}