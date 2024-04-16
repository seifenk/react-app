import Cookies from "js-cookie";

const TokenKey = process.env.REACT_APP_TOKEN_KEY as string;
export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token: string) {
    return Cookies.set(TokenKey, token);
}
