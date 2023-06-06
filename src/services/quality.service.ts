import { IQuality } from '../models';
import httpService from './http.service';
import { config } from '../config';
import api from '../api/index.js';

const qualityEndpoint = config.API_URL + 'quality/';

const qualityService = {
  // update: async (id, content) => {
  //   const data = { content: null };
  //   data.content = (await api.qualities.update(id, content)) as IProffession;
  //   //const { data } = await httpService.put(userEndpoint + id, content);
  //   return data;
  // },
  // get: async (id) => {
  //   const data = { content: null };
  //   data.content = (await api.qualities.getById(id)) as IProffession;
  //   // const { data } = await httpService.get(userEndpoint + id);
  //   return data;
  // },
  // add: async (content) => {
  //   const data = { content: null };
  //   data.content = (await api.qualities.add(content)) as IProffession;
  //   //const { data } = await httpService.post(userEndpoint, content);
  //   return data;
  // },
  // delete: async (id) => {
  //   const data = { content: null };
  //   data.content = (await api.qualities.remove(id)) as IProffession;
  //   //const { data } = await httpService.delete(userEndpoint, id);

  //   return data;
  // },
  fetchAll: async () => {
    const data = { content: null };
    data.content = (await api.qualities.fetchAll()) as IQuality[];
    //const { data } = await httpService.get(userEndpoint);
    return data;
  },
};

export default qualityService;
