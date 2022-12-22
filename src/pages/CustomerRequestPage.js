import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import { Link } from "react-router-dom";
import CustomerRequestAuth from "../auth/CustomerRequestAuth";
// MAIN FUNCTION
const CustomerRequestPage = () => {
  const [getRequests, setGetRequests] = useState([]);
  const [customerRequest, setCustomerRequest] = useState({
    customer_name: "",
    phone: "",
    medicine_details: "",
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

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="col-xs-12">{getMessage()}</div>
        <div className="block-header">
          <h2>MANAGE CUSTOMER REQUEST</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Add customer request</h2>
              </div>
              <div className="body">
                <form method="post" onSubmit={handleSubmit}>
                  <label htmlFor="email_address">Customer Name</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="customer_name"
                        name="customer_name"
                        className="form-control"
                        placeholder="Enter Customer Name"
                        value={customerRequest.customer_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Phone</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="form-control"
                        placeholder="Enter phone No."
                        value={customerRequest.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Medicine Detail.</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="medicine_details"
                        name="medicine_details"
                        className="form-control"
                        placeholder="Enter medicine details "
                        value={customerRequest.medicine_details}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <br />
                  <button
                    type="submit"
                    className="btn btn-primary m-t-15 waves-effect btn-block"
                  >
                    Add Customer Request
                  </button>
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                {customerRequest.dataLoaded == false ? (
                  <div className="text-center">
                    <div className="preloader pl-size-xl">
                      <div className="spinner-layer">
                        <div className="circle-clipper left">
                          <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                          <div className="circle"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <h2>All Customer Requests</h2>
              </div>
              <div className="body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>CUSTOMER NAME</th>
                      <th>PHONE</th>
                      <th>MEDICINE DETAIL</th>
                      <th>COMPANY NAME</th>
                      <th>ADDED ON</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getRequests.map((request, index) => (
                      <tr key={index}>
                        <td>{request.id}</td>
                        <td>{request.customer_name}</td>
                        <td>{request.phone}</td>
                        <td>{request.medicine_details}</td>
                        <td>{request.status}</td>
                        <td>{new Date(request.added_on).toLocaleString()}</td>
                        <td>
                          <Link
                            className="btn btn-block btn-primary"
                            to={`/customer_request/${request.id}`}
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerRequestPage;
