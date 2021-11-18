import axios from "axios";

const update = ({ id, payload }) => axios.put(`/attempts/${id}`, payload);
const show = id => axios.get(`/attempts/${id}`);

export const AttemptApi = {
  update,
  show,
};
