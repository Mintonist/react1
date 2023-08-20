import { IComment } from '../models';
import httpService from './http.service';
import { CONFIG } from '../config';
import api from '../api/index.js';

const endpoint = (CONFIG.IS_FIREBASE ? CONFIG.API_FIREBASE_URL : CONFIG.API_URL) + 'comment/';

const commentService = {
  // update: async (id, content) => {
  //   const data = { content: null };
  //   data.content = (await api.comments.update(id, content)) as IComment;
  //   //const { data } = await httpService.put(endpoint + id, content);
  //   return data;
  // },
  // get: async (id) => {
  //   const data = { content: null };
  //   data.content = (await api.comments.getById(id)) as IComment;
  //   // const { data } = await httpService.get(endpoint + id);
  //   return data;
  // },
  add: async (content) => {
    if (CONFIG.IS_SERVER) {
      if (CONFIG.IS_FIREBASE) {
        const { data } = await httpService.put(endpoint + content._id, content);
        return data;
      } else {
        const { data } = await httpService.post(endpoint, content);
        return data;
      }
    } else {
      const data = { content: null };
      data.content = (await api.comments.add(content)) as IComment;
      return data;
    }
  },
  delete: async (id) => {
    if (CONFIG.IS_SERVER) {
      const { data } = await httpService.delete(endpoint + id);
      return data;
    } else {
      const data = { content: null };
      data.content = (await api.comments.remove(id)) as IComment;
      return data;
    }
  },
  getComments: async (pageId) => {
    if (CONFIG.IS_SERVER) {
      if (CONFIG.IS_FIREBASE) {
        const { data } = await httpService.get(endpoint, { params: { orderBy: '"pageId"', equalTo: `"${pageId}"` } });
        return data;
      } else {
        const { data } = await httpService.get(endpoint, { params: { orderBy: 'pageId', equalTo: `${pageId}` } });
        return data;
      }
    } else {
      const data = { content: null };
      data.content = (await api.comments.fetchCommentsForUser(pageId)) as IComment[];
      return data;
    }
  },
};

export default commentService;
