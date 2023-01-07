import axios from "axios";
import { basicRoute } from "@/config/config";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.request.status === 401) {
      localStorage.removeItem("token");
      window.location.reload();
    }
  }
);

export default {
  /**
   * post request to auth/signup
   * @param {string} name
   * @param {string} login
   * @param {string} password
   * @returns {string} response message | undefined
   */
  requestSignUp: async (name, login, password) => {
    const response = await axios
      .post(`${basicRoute}auth/signup`, {
        name,
        login,
        password,
      })
      .catch(function (error) {
        console.error(error);
      });
    return response.status === 201 ? response.data.message : undefined;
  },
  /**
   * post request to auth/login
   * @param {string} login
   * @param {string} password
   * @returns {string} token | undefined
   */
  requestSignIn: async (login, password) => {
    const response = await axios
      .post(`${basicRoute}auth/login`, {
        login,
        password,
      })
      .catch(function (error) {
        console.error(error);
      });
    return response?.status === 200 ? response.data.token : undefined;
  },
  /**
   * returns all projects
   * @param {string} token
   * @returns {Array} array | undefined
   */
  getAllProjects: async (token) => {
    const response = await axios
      .get(`${basicRoute}projects/`, {
        headers: {
          Authorization: token,
        },
      })
      .catch(function (error) {
        console.error(error);
      });
    return response ? response.data : [];
  },
  /**
   * create project
   * @param {string} token
   * @param {string} name
   * @returns {string} response message | undefined
   */
  createProject: async (token, name) => {
    const response = await axios
      .post(
        `${basicRoute}projects/`,
        {
          name: name,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .catch(function (error) {
        console.error(error);
      });
    return response.status === 200 ? response.data.message : undefined;
  },
  /**
   * delete project
   * @param {string} token
   * @param {string} id
   * @returns {string} response message | undefined
   */
  deleteProject: async (token, id) => {
    const response = await axios
      .delete(`${basicRoute}projects/`, {
        headers: {
          Authorization: token,
        },
        data: {
          project_id: id,
        },
      })
      .catch(function (error) {
        console.error(error);
      });
    return response.status === 200 ? response.data.message : undefined;
  },
};
