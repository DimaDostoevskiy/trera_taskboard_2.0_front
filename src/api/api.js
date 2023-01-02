import axios from "axios";
import { basicRoute } from "@/config/config";

export default {
  requestSignUp: async (name, login, password) => {
    let result = false;
    await axios
      .post(`${basicRoute}auth/signup`, {
        name,
        login,
        password,
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 201) result = true;
      })
      .catch(function (error) {
        console.error(error);
      });
    return result;
  },
  requestSignIn: async (login, password) => {
    let result = false;
    await axios
      .post(`${basicRoute}auth/login`, {
        login,
        password,
      })
      .then(function (response) {
        result = response.status === 200 ? response.data.token : false;
      })
      .catch(function (error) {
        console.error(error);
      });
    return result;
    // TODO:REturn object { message: response.message, isAuth: true}
  },
  getAllProjects: async (token) => {
    let result = false;
    await axios
      .get(`${basicRoute}projects/`, {
        headers: {
          Authorization: token,
        },
      })
      .then(function (response) {
        console.log(response);
        result = response.status === 200 ? response.data.token : false;
      })
      .catch(function (error) {
        console.error(error);
      });
    return result;
  },
  createProject: async (token, name) => {
    let result = false;
    await axios
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
      .then(function (response) {
        console.log(response);
        result = response.status === 200 ? response.data.token : false;
      })
      .catch(function (error) {
        console.error(error);
      });
    return result;
  },
};
