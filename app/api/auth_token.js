export function storeToken (token) {
  return window.localStorage.setItem("token", token);
}

export function getToken () {
  return window.localStorage.getItem("token");
}

export function isTokenSet () {
  return window.localStorage.getItem("token") ? true : false;
}
