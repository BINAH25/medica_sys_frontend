import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "../auth/Config";
import Auth from "../auth/Auth";
import CustomerAuth from "../auth/CustomerAuth";
const CustomerPage = () => {
  const [getCustomers, setGetCustomers] = useState([]);
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    contact: "",
    companyStatus: 0,
    dataLoaded: false,
  });
  // Handle Inputs

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setCustomer({ ...customer, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setCustomer({
      companyStatus: 1,
    });
    CustomerAuth.createCustomer(
      customer.name,
      customer.address,
      customer.contact,
      handleResponse
    );
    setCustomer({
      name: "",
      address: "",
      contact: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to Add Customer..") {
      setCustomer({
        companyStatus: 4,
      });
    } else {
      setCustomer({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (customer.companyStatus === 0) {
      return "";
    } else if (customer.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (customer.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Customer added Successful!</strong>
        </div>
      );
    } else if (customer.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Customer</strong>
        </div>
      );
    }
  };
  // getting all customers
  useEffect(() => {
    getAllCustomers();
  }, []);
  let getAllCustomers = async () => {
    let res = await axios.get(Config.customerUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetCustomers(res.data);
    setCustomer({ dataLoaded: true });
  };

  return <div>CustomerPage</div>;
};

export default CustomerPage;
