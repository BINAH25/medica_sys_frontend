import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import BillDetailAuth from "../auth/BillDetailAuth";
const BillDetailPage = () => {
  const [getBills, setGetBills] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [bill, setBill] = useState({
    customer_id: "",
    companyStatus: 0,
    dataLoaded: false,
  });
  // Handle Inputs

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setBill({ ...bill, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setBill({
      companyStatus: 1,
    });
    BillAuth.createBill(bill.customer_id, handleResponse);
    setBill({
      customer_id: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to add Bill..") {
      setBill({
        companyStatus: 4,
      });
    } else {
      setBill({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (bill.companyStatus === 0) {
      return "";
    } else if (bill.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (bill.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Bill added Successful!</strong>
        </div>
      );
    } else if (bill.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Bill </strong>
        </div>
      );
    }
  };
  //getting all Bills
  useEffect(() => {
    getAllBills();
  }, []);
  let getAllBills = async () => {
    let response = await axios.get(Config.billUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetBills(response.data);
    setBill({ dataLoaded: true });
  };
  //getting all Customers
  useEffect(() => {
    getAllCustomers();
  }, []);
  let getAllCustomers = async () => {
    let res = await axios.get(Config.customerUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setCustomers(res.data);
  };

  return <div>BillDetailPage</div>;
};

export default BillDetailPage;
