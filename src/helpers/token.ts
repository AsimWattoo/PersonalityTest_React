const TOKEN_KEY = "token";

let getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

let storeToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
}

let deleteToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export {getToken, storeToken, deleteToken};