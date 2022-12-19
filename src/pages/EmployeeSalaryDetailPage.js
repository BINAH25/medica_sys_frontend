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
  const [employeeSalary, setEmployeeSalary] = useState({
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

    setEmployeeSalary({ ...employeeSalary, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmployeeSalary({
      companyStatus: 1,
    });
    EmployeeSalaryAuth.createEmployeeSalary(
      employeeSalary.employee_id,
      employeeSalary.salary_date,
      employeeSalary.salary_amount,
      handleResponse
    );
    setEmployeeSalary({
      employee_id: "",
      salary_date: "",
      salary_amount: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to Add Employee Salary..") {
      setEmployeeSalary({
        companyStatus: 4,
      });
    } else {
      setEmployeeSalary({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (employeeSalary.companyStatus === 0) {
      return "";
    } else if (employeeSalary.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (employeeSalary.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Employee Salary added Successful!</strong>
        </div>
      );
    } else if (employeeSalary.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Employee Salary</strong>
        </div>
      );
    }
  };
  // get all employee salaries
  useEffect(() => {
    getAllEmployeeSalaries();
  }, []);
  let getAllEmployeeSalaries = async () => {
    let res = await axios.get(Config.employeeSalaryUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetEmployeeSalaries(res.data);
    setEmployeeSalary({ dataLoaded: true });
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
