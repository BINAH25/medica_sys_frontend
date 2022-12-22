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
      status: res.data.status,
    });
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="col-xs-12">{getMessage()}</div>
        <div className="block-header">
          <h2>CHANGE CUSTOMER REQUEST STATUS</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2> Change Request Status to Complete</h2>
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
                  <label htmlFor="email_address">status</label>
                  <div className="form-group">
                    <div className="form-line">
                      <select
                        id="status"
                        name="status"
                        className="form-control"
                        value={customerRequest.status}
                        onChange={handleChange}
                      >
                        <option value="false">False</option>
                        <option value="true">True</option>
                      </select>
                    </div>
                  </div>

                  <br />
                  <button
                    type="submit"
                    className="btn btn-primary m-t-15 waves-effect btn-block"
                  >
                    Change Request Status to Complete
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
                <h2>All Customer Request</h2>
              </div>
              <div className="body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>CUSTOMER NAME</th>
                      <th>PHONE</th>
                      <th>MEDICINE DETAIL</th>
                      <th>STATUS</th>
                      <th>ADDED ON</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getRequests && (
                      <tr>
                        <td>{getRequests.id}</td>
                        <td>{getRequests.customer_name}</td>
                        <td>{getRequests.phone}</td>
                        <td>{getRequests.medicine_details}</td>
                        <td>
                          {getRequests.status == 0 ? "False" : "Completed"}
                        </td>
                        <td>
                          {new Date(getRequests.added_on).toLocaleString()}
                        </td>
                      </tr>
                    )}
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

export default CustomerRequestDetailPage;
