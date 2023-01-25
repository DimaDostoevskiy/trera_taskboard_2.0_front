import axios from "axios";
import { basicRoute } from "@/config/config";

//#region axios interceptors
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.request.status === 401) {
      localStorage.removeItem("token");
      window.location.reload();
    }
  }
);
//#endregion
export default {
  /**
   * sign up
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
        password
      })
      .catch(function(error) {
        console.error(error);
      });
    return response.status === 201 ? response.data.message : undefined;
  },
  /**
   * sign in
   * @param {string} login
   * @param {string} password
   * @returns {string} token | undefined
   */
  requestSignIn: async (login, password) => {
    const response = await axios
      .post(`${basicRoute}auth/login`, {
        login,
        password
      })
      .catch(function(error) {
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
      .get(`${basicRoute}projects/get-all/`, {
        headers: {
          Authorization: token
        }
      })
      .catch(function(error) {
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
        `${basicRoute}projects/create-project/`,
        {
          name: projName
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
      .catch(function(error) {
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
      .delete(`${basicRoute}projects/delete-project/`, {
        headers: {
          Authorization: token
        },
        data: {
          project_id: projId
        }
      })
      .catch(function(error) {
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
      .get(`${basicRoute}columns/get-project-columns/${projId}`, {
        headers: {
          Authorization: token
        }
      })
      .catch(function(error) {
        console.error(error);
      });
    return response.status === 200 ? response.data : [];
  },
  /**
   * create column
   * @param {string} token
   * @param {number} projId
   * @param {string} columnName
   * @returns {Promise<any|*[]>}
   */
  createColumn: async (token, projId, columnName) => {
    const response = await axios
      .post(
        `${basicRoute}columns/create-column/`,
        {
          name: columnName,
          position: 0,
          project_id: projId
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
      .catch(function(error) {
        console.error(error);
      });

    return response.status === 200 ? response.data : undefined;
  },
  /**
   * create task
   * @param {string} token
   * @param {string} name
   * @param {string} summery
   * @param {string} description
   * @param {number} column_id
   * @returns {Promise<any|*[]>}
   */
  createTask: async (token, name, summery, description, column_id) => {
    const response = await axios
      .post(
        `${basicRoute}card/create-card/`,
        {
          name,
          summery,
          description,
          column_id
        },
        {
          headers: {
            Authorization: token
          }
        })
      .catch(function(error) {
        console.error(error);
      });
    return response.status === 200 ? response.data : undefined;
  },
  /**
   * get all column's tasks
   * @param {string} token
   * @param {number} column_id
   * @returns {Promise<void>}
   */
  getTasks: async (token, column_id) => {
    const response = await axios
      .get(`${basicRoute}card/get-column-cards/${column_id}`, {
        headers: {
          Authorization: token
        }
      })
      .catch(function(error) {
        console.error(error);
      });
    return response.status === 200 ? response.data : [];
  }
};