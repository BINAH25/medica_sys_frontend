import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import BillAuth from "../auth/BillAuth";
const BillPage = () => {
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

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <h2>MANAGE BILL</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Add Bill</h2>
              </div>
              <div className="body">
                <form method="post" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12">
                      <label htmlFor="email_address">Customer</label>
                      <div className="form-group">
                        <div className="form-line">
                          <select
                            className="form-control show-tick"
                            name="customer_id"
                            id="customer_id"
                            value={bill.customer_id}
                            onChange={handleChange}
                          >
                            {customers.map((customer, index) => (
                              <option key={index} value={customer.id}>
                                {customer.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <br />
                  <button
                    type="submit"
                    className="btn btn-primary m-t-15 waves-effect btn-block"
                  >
                    Add Bill
                  </button>
                  <br />
                </form>
                <div className="col-xs-12">{getMessage()}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                {bill.dataLoaded === false ? (
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
                <h2>All Bills</h2>
              </div>
              <div className="body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>Customer Name</th>
                      <th>Customer ID</th>
                      <th>Customer Address</th>
                      <th>Customer Contact</th>
                      <th>Added On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getBills.map((bill, index) => (
                      <tr key={index}>
                        <td>{bill.id}</td>
                        <td>{bill.customer?.name}</td>
                        <td>{bill.customer?.id}</td>
                        <td>{bill.customer?.address}</td>
                        <td>{bill.customer?.contact}</td>
                        <td>{new Date(bill.added_on).toLocaleString()}</td>
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

export default BillPage;
