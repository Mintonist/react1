import axios from 'axios';
import logService from './log.service';
import { toast } from 'react-toastify';
import { CONFIG } from '../config';

axios.interceptors.request.use(
  function (config) {
    console.log('config.url', config.url);
    //подмена url для firebase
    if (CONFIG.IS_FIREBASE) {
      const containEndSlash = /\/$/gi.test(config.url);
      if (containEndSlash) {
        config.url = config.url.slice(0, -1);
      }
      const containEndJson = /.json$/gi.test(config.url);
      if (!containEndJson) {
        config.url = config.url + '.json';
      }
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

function transformData(data) {
  return data ? Object.keys(data).map((key) => ({ ...data[key] })) : [];
}

// глобально отловим ошибки 5xx ("неожидаемые")
axios.interceptors.response.use(
  (res) => {
    if (CONFIG.IS_FIREBASE) {
      res.data = { content: transformData(res.data) };
    }
    console.log('data', res);
    return res;
  },
  (err) => {
    if (err.response && err.response.status >= 500 && err.response.status < 600) {
      logService.log(err);
      console.log('Unexpected error: ' + err.response.status);
      toast.error('Ошибка сервера. Попробуйте позже.');
    }
    return Promise.reject(err);
  }
);

const httpService = { get: axios.get, post: axios.post, put: axios.patch, delete: axios.delete };
export default httpService;
