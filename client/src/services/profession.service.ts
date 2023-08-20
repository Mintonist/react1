import { IProfession } from '../models';
import httpService from './http.service';
import { CONFIG } from '../config';
import api from '../api/index.js';

const endpoint = (CONFIG.IS_FIREBASE ? CONFIG.API_FIREBASE_URL : CONFIG.API_URL) + 'profession/';

const professionService = {
  // update: async (id, content) => {
  //   const data = { content: null };
  //   data.content = (await api.professions.update(id, content)) as IProffession;
  //   //const { data } = await httpService.put(endpoint + id, content);
  //   return data;
  // },
  // get: async (id) => {
  //   const data = { content: null };
  //   data.content = (await api.professions.getById(id)) as IProffession;
  //   // const { data } = await httpService.get(endpoint + id);
  //   return data;
  // },
  // add: async (content) => {
  //   const data = { content: null };
  //   data.content = (await api.professions.add(content)) as IProffession;
  //   //const { data } = await httpService.post(endpoint, content);
  //   return data;
  // },
  // delete: async (id) => {
  //   const data = { content: null };
  //   data.content = (await api.professions.remove(id)) as IProffession;
  //   //const { data } = await httpService.delete(endpoint, id);

  //   return data;
  // },
  fetchAll: async () => {
    // console.log('professionService.fetchAll()');
    if (CONFIG.IS_SERVER) {
      const { data } = await httpService.get(endpoint);
      // console.log('professionService.fetchAll()', data);
      return data;
    } else {
      const data = { content: null };
      data.content = (await api.professions.fetchAll()) as IProfession[];
      return data;
    }
  },
};

export default professionService;
