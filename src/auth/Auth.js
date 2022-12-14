import axios from "axios";
import Config from "./Config";
import { reactLocalStorage } from "reactjs-localstorage";

class Auth {
  static login = (username, password, callback) => {
    axios
      .post(Config.loginUrl, { username: username, password: password })
      .then(function (response) {
        if (response.status === 200) {
          reactLocalStorage.set("token", response.data.access);
          reactLocalStorage.set("refresh", response.data.refresh);
          callback({ error: "false", message: "Login Successful..." });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "error during or invalid login details..",
        });
      });
  };
  static getLoginToken() {
    return reactLocalStorage.get("token");
  }
}

export default Auth;
