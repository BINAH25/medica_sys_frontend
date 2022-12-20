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

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="col-xs-12">{getMessage()}</div>
        <div className="block-header">
          <h2>MANAGE CUSTOMER</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Add Customer</h2>
              </div>
              <div className="body">
                <form method="post" onSubmit={handleSubmit}>
                  <label htmlFor="email_address">Name</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Enter customer Name"
                        value={customer.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Address</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-control"
                        placeholder="Enter customer Address"
                        value={customer.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Contact No.</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="contact"
                        name="contact"
                        className="form-control"
                        placeholder="Enter Contact No."
                        value={customer.contact}
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
                    Add Customer
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
                {customer.dataLoaded == false ? (
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
                <h2>All Customers</h2>
              </div>
              <div className="body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>NAME</th>
                      <th>Address</th>
                      <th>Contact</th>
                      <th>Added On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCustomers.map((customer, index) => (
                      <tr key={index}>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.address}</td>
                        <td>{customer.contact}</td>
                        <td>{new Date(customer.added_on).toLocaleString()}</td>
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

export default CustomerPage;
