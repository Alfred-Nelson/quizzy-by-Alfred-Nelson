import axios from "axios";

const create = payload => axios.post("/sessions", payload);
const destroy = () => axios.delete("/sessions");

export const AuthApi = {
  create,
  destroy,
};
