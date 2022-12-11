import React, { useState, useEffect } from "react";
import axios from "axios";
import CompanyBankAuth from "../auth/CompanyBankAuth";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import { Link } from "react-router-dom";

// MAIN FUNCTION
const CompanyBankPage = () => {
  const [getCompanyBanks, setGetCompanyBanks] = useState([]);
  const [companyBank, setCompanyBank] = useState({
    bank_account_no: "",
    ifsc_no: "",
    company_id: "",
    companyStatus: 0,
    dataLoaded: false,
  });
  // Handle Inputs

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setCompanyBank({ ...companyBank, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setCompanyBank({
      companyStatus: 1,
    });
    CompanyBankAuth.createCompanyBank(
      companyBank.bank_account_no,
      companyBank.ifsc_no,
      companyBank.company_id,
      handleResponse
    );
    setCompanyBank({
      bank_account_no: "",
      ifsc_no: "",
      company_id: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to Add Company Bank..") {
      setCompanyBank({
        companyStatus: 4,
      });
    } else {
      setCompanyBank({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (companyBank.companyStatus === 0) {
      return "";
    } else if (companyBank.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (companyBank.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Company Bank added Successful!</strong>
        </div>
      );
    } else if (companyBank.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Company Bank</strong>
        </div>
      );
    }
  };
  //
  useEffect(() => {
    getAllCompanyBanks();
  }, []);
  let getAllCompanyBanks = async () => {
    let res = await axios.get(Config.companyBankUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    console.log(res.data);
    setGetCompanyBanks(res.data);
    setCompanyBank({ dataLoaded: true });
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="col-xs-12">{getMessage()}</div>
        <div className="block-header">
          <h2>MANAGE COMPANY BANK</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Add Company Bank</h2>
              </div>
              <div className="body">
                <form method="post" onSubmit={handleSubmit}>
                  <label htmlFor="email_address">BANK ACCOUNT NO</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="bank_account_no"
                        name="bank_account_no"
                        className="form-control"
                        placeholder="Enter Company Name"
                        value={companyBank.bank_account_no}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">IFSC No.</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="ifsc_no"
                        name="ifsc_no"
                        className="form-control"
                        placeholder="Enter License No."
                        value={companyBank.ifsc_no}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">COMPANY ID</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="company_id"
                        name="company_id"
                        className="form-control"
                        placeholder="Enter Company Address"
                        value={companyBank.company_id}
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
                    Add Company Bank
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
                {companyBank.dataLoaded == false ? (
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
                <h2>All Company Banks</h2>
              </div>
              <div className="body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>BANK ACCOUNT NO</th>
                      <th>IFSC NO.</th>
                      <th>COMPANY ID</th>
                      <th>COMPANY NAME</th>
                      <th>ADDED ON</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCompanyBanks.map((company_bank) => (
                      <tr key={company_bank.id}>
                        <td>{company_bank.id}</td>
                        <td>{company_bank.bank_account_no}</td>
                        <td>{company_bank.ifsc_no}</td>
                        <td>{company_bank.company_id}</td>
                        <td>{company_bank.company.name}</td>
                        <td>
                          {new Date(company_bank.added_on).toLocaleString()}
                        </td>
                        <td>
                          <Link
                            className="btn btn-block btn-warning"
                            to={`/company/${company_bank.id}`}
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

export default CompanyBankPage;
