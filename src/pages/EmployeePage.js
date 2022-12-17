import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import EmployeeAuth from "../auth/EmployeeAuth";

export const EmployeePage = () => {
  const [accounts, getAccounts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companyAccount, setCompanyAccount] = useState({
    company_id: "",
    transaction_type: "",
    transaction_amt: "",
    transaction_date: "",
    payment_mode: "",
    companyStatus: 0,
    dataLoaded: false,
  });
  // Handle Inputs

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setCompanyAccount({ ...companyAccount, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setCompanyAccount({
      companyStatus: 1,
    });
    CompanyAccountAuth.createAccount(
      companyAccount.company_id,
      companyAccount.transaction_type,
      companyAccount.transaction_amt,
      companyAccount.transaction_date,
      companyAccount.payment_mode,
      handleResponse
    );
    setCompanyAccount({
      company_id: "",
      transaction_type: "",
      transaction_amt: "",
      transaction_date: "",
      payment_mode: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to add Account..") {
      setCompanyAccount({
        companyStatus: 4,
      });
    } else {
      setCompanyAccount({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (companyAccount.companyStatus === 0) {
      return "";
    } else if (companyAccount.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (companyAccount.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Account added Successful!</strong>
        </div>
      );
    } else if (companyAccount.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Account </strong>
        </div>
      );
    }
  };
  //getting all accounts
  useEffect(() => {
    getAllAccounts();
  }, []);
  let getAllAccounts = async () => {
    let response = await axios.get(Config.companyAccountUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    getAccounts(response.data);
    setCompanyAccount({ dataLoaded: true });
  };
  //getting all Companies
  useEffect(() => {
    getAllCompanies();
  }, []);
  let getAllCompanies = async () => {
    let res = await axios.get(Config.companyUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setCompanies(res.data);
  };

  return <div>EmployeePage</div>;
};
