export const CONFIG = {
  IS_SERVER: true, // true - используется httpService, false - используется fakeAPI (без общения с сервером)
  IS_FIREBASE: false, // выбор сервера: между API_FIREBASE_URL и API_URL
  API_FIREBASE_URL: 'https://fast-company-69553-default-rtdb.europe-west1.firebasedatabase.app/',
  API_URL: 'http://127.0.0.1:8080/api/',
  SENTRY_DSN: 'https://1111111111.sentry.io/111111',
};
