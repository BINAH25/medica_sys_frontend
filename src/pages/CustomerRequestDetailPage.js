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
    CustomerRequestAuth.createCustomerRequest(
      customerRequest.customer_name,
      customerRequest.phone,
      customerRequest.medicine_details,
      handleResponse
    );
    setCustomerRequest({
      customer_name: "",
      phone: "",
      medicine_details: "",
    });
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
          <strong>Company Bank added Successful!</strong>
        </div>
      );
    } else if (customerRequest.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Company Bank</strong>
        </div>
      );
    }
  };
  // getting all customer request
  useEffect(() => {
    getAllCustomerRequest();
  }, []);
  let getAllCustomerRequest = async () => {
    let res = await axios.get(Config.customerRequestUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetRequests(res.data);
    setCustomerRequest({ dataLoaded: true });
  };

  return <div>CustomerRequestDetailPage</div>;
};

export default CustomerRequestDetailPage;
