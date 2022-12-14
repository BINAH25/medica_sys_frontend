import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Config from "../auth/Config";
import Auth from "../auth/Auth";
import CompanyAuth from "../auth/CompanyAuth";

// main function
const CompanyDetailPage = () => {
  const params = useParams();
  const id = params.id;
  // useState for getting company
  const [company, setCompany] = useState(null);

  // useState for updating company
  const [ediCompany, setEditCompany] = useState({
    name: "",
    license_no: "",
    address: "",
    contact_no: "",
    email: "",
    description: "",
    companyStatus: 0,
  });

  // Handle Inputs
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setEditCompany({ ...ediCompany, [name]: value });
  };

  // calling the fetched data function
  useEffect(() => {
    getData();
  }, [id]);

  // fetching data from the api
  let getData = async () => {
    let res = await axios.get(Config.companyUrl + id, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setCompany(res.data);
    setEditCompany({
      name: res.data.name,
      license_no: res.data.license_no,
      address: res.data.address,
      contact_no: res.data.contact_no,
      email: res.data.email,
      description: res.data.description,
    });
  };

  // Handle formSubmit for company update
  const handleSubmit = (e) => {
    e.preventDefault();
    setEditCompany({
      companyStatus: 1,
    });
    CompanyAuth.editCompany(
      ediCompany.name,
      ediCompany.license_no,
      ediCompany.address,
      ediCompany.contact_no,
      ediCompany.email,
      ediCompany.description,
      id,
      handleResponse
    );
    setEditCompany({
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
    console.log(data);
    if (data.message === "Error, Failed to Update Company..") {
      setEditCompany({
        companyStatus: 4,
      });
    } else {
      setEditCompany({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (ediCompany.companyStatus === 0) {
      return "";
    } else if (ediCompany.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (ediCompany.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Company added Successful!</strong>
        </div>
      );
    } else if (ediCompany.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Company</strong>
        </div>
      );
    }
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <h2>UPDATE COMPANY</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Update Company</h2>
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
                        value={ediCompany.name}
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
                        value={ediCompany.license_no}
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
                        value={ediCompany.address}
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
                        value={ediCompany.contact_no}
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
                        value={ediCompany.email}
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
                        value={ediCompany.description}
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
                    Update Company
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
                <h2>Company Detail</h2>
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
                    {company && (
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
                          <button className="btn btn-block btn-danger">
                            delete
                          </button>
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

export default CompanyDetailPage;
