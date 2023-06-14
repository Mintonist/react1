import { IQuality } from '../models';
import httpService from './http.service';
import { CONFIG } from '../config';
import api from '../api/index.js';

const endpoint = CONFIG.API_URL + 'quality/';

const qualityService = {
  // update: async (id, content) => {
  //   const data = { content: null };
  //   data.content = (await api.qualities.update(id, content)) as IProffession;
  //   //const { data } = await httpService.put(endpoint + id, content);
  //   return data;
  // },
  // get: async (id) => {
  //   const data = { content: null };
  //   data.content = (await api.qualities.getById(id)) as IProffession;
  //   // const { data } = await httpService.get(endpoint + id);
  //   return data;
  // },
  // add: async (content) => {
  //   const data = { content: null };
  //   data.content = (await api.qualities.add(content)) as IProffession;
  //   //const { data } = await httpService.post(endpoint, content);
  //   return data;
  // },
  // delete: async (id) => {
  //   const data = { content: null };
  //   data.content = (await api.qualities.remove(id)) as IProffession;
  //   //const { data } = await httpService.delete(endpoint, id);

  //   return data;
  // },
  fetchAll: async () => {
    if (CONFIG.IS_FIREBASE) {
      const { data } = await httpService.get(endpoint);
      return data;
    } else {
      const data = { content: null };
      data.content = (await api.qualities.fetchAll()) as IQuality[];
      return data;
    }
  },
};

export default qualityService;
