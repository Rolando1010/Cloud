import { API_URL } from "./constants";

const GET = "GET";
const POST = "POST";
const DELETE = "DELETE";

const request = (url, method = GET, body, isFormData) => {
    return new Promise((resolve, reject) => {
        fetch(API_URL + url, {
            method,
            body: body ? (isFormData ? body : JSON.stringify(body)) : null,
            headers: isFormData ? {} : {"Content-Type": "application/json"}
        }).then(response => response.json()).then(resolve).catch(reject);
    });
}

const get = url => request(url);

const post = (url, body, isFormData) => request(url, POST, body, isFormData);

const deleteRequest = (url) => request(url, DELETE);

const requests = { get, post, delete: deleteRequest };

export default requests;