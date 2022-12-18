import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import EmployeeAuth from "../auth/EmployeeAuth";
import { useParams } from "react-router-dom";
const EmployeeDetailPage = () => {
  const params = useParams();
  const id = params.id;
  const [getEmployee, setGetEmployee] = useState(null);
  const [updateEmployee, setUpdateEmployee] = useState({
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

    setUpdateEmployee({ ...updateEmployee, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateEmployee({
      companyStatus: 1,
    });
    EmployeeAuth.editEmployee(
      updateEmployee.name,
      updateEmployee.joining_date,
      updateEmployee.phone,
      updateEmployee.address,
      id,
      handleResponse
    );
    setUpdateEmployee({
      name: "",
      joining_date: "",
      phone: "",
      address: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to Update Employee..") {
      setUpdateEmployee({
        companyStatus: 4,
      });
    } else {
      setUpdateEmployee({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (employee.companyStatus === 0) {
      return "";
    } else if (updateEmployee.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (updateEmployee.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Employee Updated Successful!</strong>
        </div>
      );
    } else if (updateEmployee.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Update Employee </strong>
        </div>
      );
    }
  };
  //getting single Employee
  useEffect(() => {
    getSingleEmployee();
  }, []);
  let getSingleEmployee = async () => {
    let response = await axios.get(Config.employeeUrl + id, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetEmployee(response.data);
    setUpdateEmployee({ dataLoaded: true });
  };

  return <div>EmployeeDetailPage</div>;
};

export default EmployeeDetailPage;
