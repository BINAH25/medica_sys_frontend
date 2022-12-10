import React, { useState, useEffect } from "react";
import CompanyAuth from "../auth/CompanyAuth";
import axios from "axios";
import Config from "../auth/Config";
import Auth from "../auth/Auth";
import { Link } from "react-router-dom";

const CompanyPages = () => {
  const [getCompanies, setGetCompanies] = useState([]);
  const [company, setCompany] = useState({
    name: "",
    license_no: "",
    address: "",
    contact_no: "",
    email: "",
    description: "",
    companyStatus: 0,
    dataLoaded: false,
  });
  // Handle Inputs

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setCompany({ ...company, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setCompany({
      companyStatus: 1,
    });
    CompanyAuth.companyCreate(
      company.name,
      company.license_no,
      company.address,
      company.contact_no,
      company.email,
      company.description,
      handleResponse
    );
    setCompany({
      name: "",
      license_no: "",
      address: "",
      contact_no: "",
      email: "",
      description: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to Add Company..") {
      setCompany({
        companyStatus: 4,
      });
    } else {
      setCompany({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (company.companyStatus === 0) {
      return "";
    } else if (company.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (company.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Company added Successful!</strong>
        </div>
      );
    } else if (company.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Company</strong>
        </div>
      );
    }
  };
  //
  useEffect(() => {
    getAllCompanies();
  }, []);
  let getAllCompanies = async () => {
    let res = await axios.get(Config.companyUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetCompanies(res.data);
    setCompany({ dataLoaded: true });
  };

  // VIEW AND UPDDATE COMPANY BY ID
  const viewCompany = (company_id) => {
    console.log(company_id);
  };
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="col-xs-12">{getMessage()}</div>
        <div className="block-header">
          <h2>MANAGE COMPANY</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Add Company</h2>
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
                        placeholder="Enter Company Name"
                        value={company.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">License No.</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="license_no"
                        name="license_no"
                        className="form-control"
                        placeholder="Enter License No."
                        value={company.license_no}
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
                        placeholder="Enter Company Address"
                        value={company.address}
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
                        id="contact_no"
                        name="contact_no"
                        className="form-control"
                        placeholder="Enter Contact No."
                        value={company.contact_no}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Email</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter Company Email"
                        value={company.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Description</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="description"
                        name="description"
                        className="form-control"
                        placeholder="Enter Description"
                        value={company.description}
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
                    Add Company
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
                {company.dataLoaded == false ? (
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
                <h2>All Companies</h2>
              </div>
              <div className="body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>NAME</th>
                      <th>License NO.</th>
                      <th>Address</th>
                      <th>Contact</th>
                      <th>Email</th>
                      <th>Description</th>
                      <th>Added On</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCompanies.map((company) => (
                      <tr key={company.id}>
                        <td>{company.id}</td>
                        <td>{company.name}</td>
                        <td>{company.license_no}</td>
                        <td>{company.address}</td>
                        <td>{company.contact_no}</td>
                        <td>{company.email}</td>
                        <td>{company.description}</td>
                        <td>{new Date(company.added_on).toLocaleString()}</td>
                        <td>
                          <Link
                            className="btn btn-block btn-warning"
                            to={`/company/${company.id}`}
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

export default CompanyPages;
