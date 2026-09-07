import { httpClient } from "./httpClient";

export const createResourceApi = ({ baseUrl }) => ({
  getAll: () => httpClient.get(baseUrl),
  getById: (id) => httpClient.get(`${baseUrl}/${id}`),
  create: (data) => httpClient.post(baseUrl, data),
  update: (id, data) => httpClient.put(`${baseUrl}/${id}`, data),
  remove: (id) => httpClient.remove(`${baseUrl}/${id}`),
});
