import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import CustomerRequestAuth from "../auth/CustomerRequestAuth";
import { useParams } from "react-router-dom";
const CustomerRequestDetailPage = () => {
  const params = useParams();
  const id = params.id;
  const [getRequests, setGetRequests] = useState(null);
  const [customerRequest, setCustomerRequest] = useState({
    customer_name: "",
    phone: "",
    medicine_details: "",
    status: "",
    companyStatus: 0,
    dataLoaded: false,
  });
  // Handle Inputs

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setCustomerRequest({ ...customerRequest, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setCustomerRequest({
      companyStatus: 1,
    });
    CustomerRequestAuth.editCustomerRequest(
      customerRequest.customer_name,
      customerRequest.phone,
      customerRequest.medicine_details,
      customerRequest.status,
      id,
      handleResponse
    );
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to Add Company Bank..") {
      setCustomerRequest({
        companyStatus: 4,
      });
    } else {
      setCustomerRequest({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (customerRequest.companyStatus === 0) {
      return "";
    } else if (customerRequest.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (customerRequest.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Customer request completed </strong>
        </div>
      );
    } else if (customerRequest.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to completed Customer request </strong>
        </div>
      );
    }
  };
  // getting single customer request
  useEffect(() => {
    getSingleCustomerRequest();
  }, []);
  let getSingleCustomerRequest = async () => {
    let res = await axios.get(Config.customerRequestUrl + id, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetRequests(res.data);
    setCustomerRequest({
      customer_name: res.data.customer_name,
      phone: res.data.phone,
      medicine_details: res.data.medicine_details,
    });
  };

  return <div>CustomerRequestDetailPage</div>;
};

export default CustomerRequestDetailPage;
