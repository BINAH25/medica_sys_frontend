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

    setUpdateEmployeeBank({ ...updateEmployeeBank, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateEmployeeBank({
      companyStatus: 1,
    });
    EmployeeBankAuth.editEmployeeBank(
      updateEmployeeBank.bank_account_no,
      updateEmployeeBank.ifsc_no,
      updateEmployeeBank.employee_id,
      id,
      handleResponse
    );
    setUpdateEmployeeBank({
      bank_account_no: "",
      ifsc_no: "",
      employee_id: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to Update Employee Bank..") {
      setUpdateEmployeeBank({
        companyStatus: 4,
      });
    } else {
      setUpdateEmployeeBank({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (updateEmployeeBank.companyStatus === 0) {
      return "";
    } else if (updateEmployeeBank.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (updateEmployeeBank.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Employee Bank Updated Successful!</strong>
        </div>
      );
    } else if (updateEmployeeBank.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Update Employee Bank</strong>
        </div>
      );
    }
  };
  // get  employee bank by id
  useEffect(() => {
    getEmployeeById();
  }, []);
  let getEmployeeById = async () => {
    let res = await axios.get(Config.employeeBankUrl + id, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetEmployeeBank(res.data);
    setUpdateEmployeeBank({
      bank_account_no: res.data.bank_account_no,
      ifsc_no: res.data.ifsc_no,
      employee_id: res.data.employee_id,
    });
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
