import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import EmployeeAuth from "../auth/EmployeeAuth";

export const EmployeePage = () => {
  const [getEmployee, setGetEmployee] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    joining_date: "",
    phone: "",
    address: "",
    companyStatus: 0,
    dataLoaded: false,
  });
  // Handle Inputs

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setEmployee({ ...employee, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmployee({
      companyStatus: 1,
    });
    EmployeeAuth.createEmployee(
      employee.name,
      employee.joining_date,
      employee.phone,
      employee.address,
      handleResponse
    );
    setEmployee({
      name: "",
      joining_date: "",
      phone: "",
      address: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to add Employee..") {
      setEmployee({
        companyStatus: 4,
      });
    } else {
      setEmployee({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (employee.companyStatus === 0) {
      return "";
    } else if (employee.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (employee.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Employee added Successful!</strong>
        </div>
      );
    } else if (employee.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Employee </strong>
        </div>
      );
    }
  };
  //getting all Employees
  useEffect(() => {
    getAllEmployees();
  }, []);
  let getAllEmployees = async () => {
    let response = await axios.get(Config.employeeUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetEmployee(response.data);
    setEmployee({ dataLoaded: true });
  };

  return <div>EmployeePage</div>;
};
