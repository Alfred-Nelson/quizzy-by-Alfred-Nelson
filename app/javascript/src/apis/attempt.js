import axios from "axios";

const update = ({ id, payload }) => axios.put(`/attempts/${id}`, payload);

export const AttemptApi = {
  update,
};
