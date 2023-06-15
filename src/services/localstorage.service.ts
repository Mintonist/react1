const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refresh-token';
const EXPIRES_KEY = 'jwt-expires';

export function setTokens({ experiesIn = 3600, refreshToken, idToken }) {
  const expiresDate = new Date().getTime() + experiesIn * 1000;
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate.toString());
}

export function getAccessToken() {
  localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
  localStorage.getItem(REFRESH_KEY);
}

export function getExpiresDate() {
  return Number(localStorage.getItem(EXPIRES_KEY));
}

const localStorageService = { setTokens, getAccessToken, getRefreshToken, getExpiresDate };

export default localStorageService;
