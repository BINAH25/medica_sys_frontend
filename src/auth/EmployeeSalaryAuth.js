import axios from "axios";
import Config from "./Config";
import Auth from "./Auth";
class EmployeeSalaryAuth {
  // creating employee salary url
  static createEmployeeSalary = (
    employee_id,
    salary_date,
    salary_amount,
    callback
  ) => {
    axios
      .post(
        Config.employeeSalaryUrl,
        {
          employee_id: employee_id,
          salary_date: salary_date,
          salary_amount: salary_amount,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          callback({
            error: "false",
            message: "Employee Salary added Successful...",
          });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to Add Employee Salary..",
        });
      });
  };
  // creating edit  company url
  static editEmployeeSalary = (
    employee_id,
    salary_date,
    salary_amount,
    id,
    callback
  ) => {
    axios
      .put(
        Config.employeeSalaryUrl + id + "/",
        {
          employee_id: employee_id,
          salary_date: salary_date,
          salary_amount: salary_amount,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          callback({
            error: "false",
            message: "Employee Salary Updated Successful...",
          });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to Update Employee Salary..",
        });
      });
  };
}

export default EmployeeSalaryAuth;
