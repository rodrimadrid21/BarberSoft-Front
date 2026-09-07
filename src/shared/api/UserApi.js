import { createResourceApi } from "./resourceApi";

const userApi = createResourceApi({
  baseUrl: "https://localhost:7284/api/user",
});

export const getUsers = userApi.getAll;
export const getUserById = userApi.getById;
export const createUser = userApi.create;
export const updateUser = userApi.update;
export const deleteUser = userApi.remove;