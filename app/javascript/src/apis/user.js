import axios from "axios";

const update = (id, payload) => axios.put(`api/v1/users/${id}`, payload);

const userApi = {
  update,
};

export default userApi;
