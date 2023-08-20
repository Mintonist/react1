import { IProfession, IQuality, IUser } from './../models';
import { useState } from 'react';
import users from '../mockData/users.json';
import professions from '../mockData/professions.json';
import qualities from '../mockData/qualities.json';
import httpService from '../services/http.service';
import { CONFIG } from '../config';

const useMockData = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('Not started');

  const initialized = async () => {
    try {
      if (CONFIG.IS_FIREBASE) {
        for (let user of users) {
          await httpService.put(CONFIG.API_FIREBASE_URL + 'user/' + user._id, user);
        }
        for (let prof of professions as Array<IProfession>) {
          await httpService.put(CONFIG.API_FIREBASE_URL + 'profession/' + prof._id, prof);
        }
        for (let q of qualities as Array<IQuality>) {
          await httpService.put(CONFIG.API_FIREBASE_URL + 'quality/' + q._id, q);
        }
      }
    } catch (err) {
      setError(err);
    }
  };

  return { error, initialized };
};

export default useMockData;
