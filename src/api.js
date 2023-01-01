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
  },
};