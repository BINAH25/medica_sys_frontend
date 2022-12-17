import axios from "axios";
import Config from "./Config";
import Auth from "./Auth";
class EmployeeAuth {
  static createEmployee = (name, joining_date, phone, address, callback) => {
    axios
      .post(
        Config.employeeUrl,
        {
          name: name,
          joining_date: joining_date,
          phone: phone,
          address: address,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          callback({ error: "false", message: "Employee added Successful..." });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to Add Employee..",
        });
      });
  };

  static editEmployee = (name, joining_date, phone, address, id, callback) => {
    axios
      .put(
        Config.employeeUrl + id + "/",
        {
          name: name,
          joining_date: joining_date,
          phone: phone,
          address: address,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          callback({
            error: "false",
            message: "Employee Updated Successful...",
          });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to Update Employee..",
        });
      });
  };

  // url to get all company
}

export default EmployeeAuth;
