import { createResourceApi } from "./resourceApi";

const clientApi = createResourceApi({
  baseUrl: "https://localhost:7284/api/client",
});

export const getClient = clientApi.getAll;
export const createClient = clientApi.create;
export const updateClient = clientApi.update;
export const deleteClient = clientApi.remove;