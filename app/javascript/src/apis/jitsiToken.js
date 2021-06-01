import axios from "axios";

const create = payload => axios.post("api/v1/jitsi_token", payload);

const jitsiTokenApi = {
  create,
};

export default jitsiTokenApi;
