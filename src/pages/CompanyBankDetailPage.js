import React, { useState, useEffect } from "react";
import axios from "axios";
import CompanyBankAuth from "../auth/CompanyBankAuth";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const CompanyBankDetailPage = () => {
  const params = useParams();
  const id = params.id;

  const [companyBank, setCompanyBank] = useState([]);
  const [updateCompanyBank, setUpdateCompanyBank] = useState({
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

    setUpdateCompanyBank({ ...updateCompanyBank, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateCompanyBank({
      companyStatus: 1,
    });
    CompanyBankAuth.editCompanyBank(
      updateCompanyBank.bank_account_no,
      updateCompanyBank.ifsc_no,
      updateCompanyBank.company_id,
      id,
      handleResponse
    );
    setUpdateCompanyBank({
      bank_account_no: "",
      ifsc_no: "",
      company_id: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to Update Company..") {
      setUpdateCompanyBank({
        companyStatus: 4,
      });
    } else {
      setUpdateCompanyBank({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (updateCompanyBank.companyStatus === 0) {
      return "";
    } else if (updateCompanyBank.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (updateCompanyBank.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Company Bank Updated Successful!</strong>
        </div>
      );
    } else if (updateCompanyBank.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Update Company Bank</strong>
        </div>
      );
    }
  };
  //
  useEffect(() => {
    getData();
  }, []);
  let getData = async () => {
    let res = await axios.get(Config.companyBankUrl + id, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    console.log(res.data);
    setCompanyBank(res.data);
    setUpdateCompanyBank({
      bank_account_no: res.data.bank_account_no,
      ifsc_no: res.data.ifsc_no,
      company_id: res.data.company_id,
    });
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <h2>UPDATE COMPANY BANK</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Update Company Bank</h2>
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
                        value={updateCompanyBank.bank_account_no}
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
                        value={updateCompanyBank.ifsc_no}
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
                        value={updateCompanyBank.company_id}
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
                    Update Company Bank
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
                    {companyBank && (
                      <tr key={companyBank.id}>
                        <td>{companyBank.id}</td>
                        <td>{companyBank.bank_account_no}</td>
                        <td>{companyBank.ifsc_no}</td>
                        <td>{companyBank.company_id}</td>
                        <td>{companyBank.company?.name}</td>
                        <td>
                          {new Date(companyBank.added_on).toLocaleString()}
                        </td>
                        <td>
                          <Link
                            className="btn btn-block btn-danger"
                            to={`/company/${companyBank.id}`}
                          >
                            Delete
                          </Link>
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

export default CompanyBankDetailPage;
