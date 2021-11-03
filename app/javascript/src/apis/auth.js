import axios from "axios";

const create = payload => axios.post("/sessions", payload);

export const AuthApi = {
  create,
};
