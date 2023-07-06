export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
export const API_TOKEN = process.env.REACT_APP_API_TOKEN;
export const CONFIG = {
    headers:{
        'Content-Type':'application/x-www-form-urlencode'
    },
    headers_post:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${API_TOKEN}`,
    }
}