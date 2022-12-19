import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import EmployeeSalaryAuth from "../auth/EmployeeSalaryAuth";
import { useParams } from "react-router-dom";
const EmployeeSalaryDetailPage = () => {
  //
  const params = useParams();
  const id = params.id;
  //
  const [getEmployeeSalaries, setGetEmployeeSalaries] = useState(null);
  //
  const [employees, setEmployees] = useState([]);
  //
  const [updateEmployeeSalary, setUpdateEmployeeSalary] = useState({
    employee_id: "",
    salary_date: "",
    salary_amount: "",
    companyStatus: 0,
    dataLoaded: false,
  });
  // Handle Inputs

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    updateEmployeeSalary({ ...updateEmployeeSalary, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployeeSalary({
      companyStatus: 1,
    });
    EmployeeSalaryAuth.editEmployeeSalary(
      updateEmployeeSalary.employee_id,
      updateEmployeeSalary.salary_date,
      updateEmployeeSalary.salary_amount,
      id,
      handleResponse
    );
    updateEmployeeSalary({
      employee_id: "",
      salary_date: "",
      salary_amount: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to Add Employee Salary..") {
      updateEmployeeSalary({
        companyStatus: 4,
      });
    } else {
      updateEmployeeSalary({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (updateEmployeeSalary.companyStatus === 0) {
      return "";
    } else if (updateEmployeeSalary.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (updateEmployeeSalary.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Employee Salary added Successful!</strong>
        </div>
      );
    } else if (updateEmployeeSalary.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Employee Salary</strong>
        </div>
      );
    }
  };
  // get all employee salary by id
  useEffect(() => {
    getEmployeeSalary();
  }, []);
  let getEmployeeSalary = async () => {
    let res = await axios.get(Config.employeeSalaryUrl + id, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetEmployeeSalaries(res.data);
    updateEmployeeSalary({
      employee_id: res.data.employee_id,
      salary_date: res.data.salary_date,
      salary_amount: res.data.salary_amount,
    });
  };
  // get all employees
  useEffect(() => {
    getAllEmployees();
  }, []);
  let getAllEmployees = async () => {
    let res = await axios.get(Config.employeeUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setEmployees(res.data);
  };

  return <div>EmployeeSalaryDetailPage</div>;
};

export default EmployeeSalaryDetailPage;
