
export function storeToken(token) {
  return window.localStorage.setItem('token', token);
}

export function getToken() {
  return window.localStorage.getItem('token');
}

export function isTokenSet() {
  return typeof window.localStorage.getItem('token') === 'string';
}
