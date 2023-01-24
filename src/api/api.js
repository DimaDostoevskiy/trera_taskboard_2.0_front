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
   * signup
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
   * signin
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
   * @returns {Array} array
   */
  getAllProjects: async (token) => {
    const response = await axios
      .get(`${basicRoute}projects/`, {
        headers: {
          Authorization: token,
        },
      })
      .catch(function (error) {
        console.error(`api//getAllProjects error: ${error}`);
      });
    return response ? response.data : [];
  },
  /**
   * create project
   * @param {string} token
   * @param {string} projName
   * @returns {string} response message | undefined
   */
  createProject: async (token, projName) => {
    const response = await axios
      .post(
        `${basicRoute}projects/`,
        {
          name: projName,
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
   * @param {string} projId
   * @returns {string} response message | undefined
   */
  deleteProject: async (token, projId) => {
    const response = await axios
      .delete(`${basicRoute}projects/`, {
        headers: {
          Authorization: token,
        },
        data: {
          project_id: projId,
        },
      })
      .catch(function (error) {
        console.error(error);
      });
    return response.status === 200 ? response.data.message : undefined;
  },
  /**
   * get columns
   * @param {string} token
   * @param {number} projId
   * @returns {Array} columns | []
   */
  getColumns: async (token, projId) => {
    if (!projId) return [];

    const response = await axios
      .get(`${basicRoute}columns/${projId}`, {
        headers: {
          Authorization: token,
        },
      })
      .catch(function (error) {
        console.error(error);
      });
    return response.status === 200 ? response.data : [];
  },

  createColumn: async (token, projId, columnName) => {
    const response = await axios
      .post(
        `${basicRoute}columns/`,
        {
          name: columnName,
          position: 0,
          project_id: projId,
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

    return response.status === 200 ? response.data : [];
  },
  getCards: async (id) => {},
};
