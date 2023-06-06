import { IProfession } from '../models';
import httpService from './http.service';
import { config } from '../config';
import api from '../api/index.js';

const professionEndpoint = config.API_URL + 'profession/';

const professionService = {
  // update: async (id, content) => {
  //   const data = { content: null };
  //   data.content = (await api.professions.update(id, content)) as IProffession;
  //   //const { data } = await httpService.put(userEndpoint + id, content);
  //   return data;
  // },
  // get: async (id) => {
  //   const data = { content: null };
  //   data.content = (await api.professions.getById(id)) as IProffession;
  //   // const { data } = await httpService.get(userEndpoint + id);
  //   return data;
  // },
  // add: async (content) => {
  //   const data = { content: null };
  //   data.content = (await api.professions.add(content)) as IProffession;
  //   //const { data } = await httpService.post(userEndpoint, content);
  //   return data;
  // },
  // delete: async (id) => {
  //   const data = { content: null };
  //   data.content = (await api.professions.remove(id)) as IProffession;
  //   //const { data } = await httpService.delete(userEndpoint, id);

  //   return data;
  // },
  fetchAll: async () => {
    const data = { content: null };
    data.content = (await api.professions.fetchAll()) as IProfession[];
    //const { data } = await httpService.get(userEndpoint);
    return data;
  },
};

export default professionService;
