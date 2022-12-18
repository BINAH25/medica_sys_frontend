import axios from "axios";
import Config from "./Config";
import Auth from "./Auth";
class EmployeeBankAuth {
  // creating   company url
  static createEmployeeBank = (
    bank_account_no,
    ifsc_no,
    employee_id,
    callback
  ) => {
    axios
      .post(
        Config.employeeBankUrl,
        {
          bank_account_no: bank_account_no,
          ifsc_no: ifsc_no,
          employee_id: employee_id,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          callback({
            error: "false",
            message: "Employee Bank added Successful...",
          });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to Add Employee Bank..",
        });
      });
  };
  // creating edit  company url
  static editEmployeeBank = (
    bank_account_no,
    ifsc_no,
    employee_id,
    id,
    callback
  ) => {
    axios
      .put(
        Config.employeeBankUrl + id + "/",
        {
          bank_account_no: bank_account_no,
          ifsc_no: ifsc_no,
          employee_id: employee_id,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          callback({
            error: "false",
            message: "Employee Bank Updated Successful...",
          });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to Update Employee Bank..",
        });
      });
  };
}

export default EmployeeBankAuth;
