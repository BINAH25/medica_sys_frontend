import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import EmployeeBankAuth from "../auth/EmployeeBankAuth";
import { useParams } from "react-router-dom";
export const EmployeeBankDetailPage = () => {
  // getting the url params or id
  const params = useParams();
  const id = params.id;
  // getting employee bank
  const [getEmployeeBank, setGetEmployeeBank] = useState(null);
  // getting all employees
  const [employees, setEmployees] = useState([]);
  // updating the employee bank
  const [updateEmployeeBank, setUpdateEmployeeBank] = useState({
    bank_account_no: "",
    ifsc_no: "",
    employee_id: "",
    companyStatus: 0,
    dataLoaded: false,
  });
  // Handle Inputs

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setEmployeeBank({ ...employeeBank, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmployeeBank({
      companyStatus: 1,
    });
    EmployeeBankAuth.createEmployeeBank(
      employeeBank.bank_account_no,
      employeeBank.ifsc_no,
      employeeBank.employee_id,
      handleResponse
    );
    setEmployeeBank({
      bank_account_no: "",
      ifsc_no: "",
      employee_id: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to Add Employee Bank..") {
      setEmployeeBank({
        companyStatus: 4,
      });
    } else {
      setEmployeeBank({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (employeeBank.companyStatus === 0) {
      return "";
    } else if (employeeBank.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (employeeBank.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Employee Bank added Successful!</strong>
        </div>
      );
    } else if (employeeBank.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Employee Bank</strong>
        </div>
      );
    }
  };
  // get all employee banks
  useEffect(() => {
    getAllEmployeeBanks();
  }, []);
  let getAllEmployeeBanks = async () => {
    let res = await axios.get(Config.employeeBankUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetEmployeeBank(res.data);
    setEmployeeBank({ dataLoaded: true });
  };
  // get all employees
  useEffect(() => {
    getAllCompanies();
  }, []);
  let getAllCompanies = async () => {
    let res = await axios.get(Config.employeeUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setEmployees(res.data);
  };

  return <div>EmployeeBankDetailPage</div>;
};
