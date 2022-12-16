import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import CompanyAccountAuth from "../auth/CompanyAccountAuth";
const CompanyAccountPage = () => {
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <h2>MANAGE COMPANY ACCOUNT</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Add Company Account Bill</h2>
              </div>
              <div className="body">
                <form>
                  <div className="row">
                    <div className="col-lg-4">
                      <label htmlFor="email_address">Company</label>
                      <div className="form-group">
                        <div className="form-line">
                          <select
                            className="form-control show-tick"
                            name="company_id"
                            id="company_id"
                          >
                            {this.state.companylist.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <label htmlFor="email_address">Transaction Type</label>
                      <div className="form-group">
                        <div className="form-line">
                          <select
                            id="transaction_type"
                            name="transaction_type"
                            className="form-control"
                          >
                            <option value="1">Debit</option>
                            <option value="2">Credit</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <label htmlFor="email_address">Amount</label>
                      <div className="form-group">
                        <div className="form-line">
                          <input
                            type="text"
                            id="transaction_amt"
                            name="transaction_amt"
                            className="form-control"
                            placeholder="Enter Amount"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <label htmlFor="email_address">Transaction Date</label>
                      <div className="form-group">
                        <div className="form-line">
                          <input
                            type="date"
                            id="transaction_date"
                            name="transaction_date"
                            className="form-control"
                            placeholder="Enter Transaction Date"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <label htmlFor="email_address">Payment Mode</label>
                      <div className="form-group">
                        <div className="form-line">
                          <input
                            type="text"
                            id="payment_mode"
                            name="payment_mode"
                            className="form-control"
                            placeholder="Enter Payement Mode"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-primary m-t-15 waves-effect btn-block"
                  >
                    Add Account
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
                {this.state.dataLoaded == false ? (
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
                <h2>All Companies Account Transactions</h2>
              </div>
              <div className="body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>Company Name</th>
                      <th>Company ID</th>
                      <th>Transaction Type</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Payment Mode</th>
                      <th>Added On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.companyAccountdata.map((companyaccount) => (
                      <tr key={companyaccount.id}>
                        <td>{companyaccount.id}</td>
                        <td>{companyaccount.company.name}</td>
                        <td>{companyaccount.company.id}</td>
                        <td>
                          {companyaccount.transaction_type == 1
                            ? "Debit"
                            : "Credit"}
                        </td>
                        <td>{companyaccount.transaction_amt}</td>
                        <td>{companyaccount.transaction_date}</td>
                        <td>{companyaccount.payment_mode}</td>
                        <td>
                          {new Date(companyaccount.added_on).toLocaleString()}
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

export default CompanyAccountPage;
