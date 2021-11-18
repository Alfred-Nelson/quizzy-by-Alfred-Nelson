import axios from "axios";

const create = payload => axios.post("/users", payload);

export const UserApi = {
  create,
};
