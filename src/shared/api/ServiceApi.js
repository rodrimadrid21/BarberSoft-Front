import { createResourceApi } from "./resourceApi";

const serviceApi = createResourceApi({
  baseUrl: "https://localhost:7284/api/services",
});

export const getServices = serviceApi.getAll;
export const createService = serviceApi.create;
export const updateService = serviceApi.update;
export const deleteService = serviceApi.remove;