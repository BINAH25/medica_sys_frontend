import React, { useState, useEffect } from "react";
import CompanyAuth from "../auth/CompanyAuth";
import axios from "axios";
import Config from "../auth/Config";
import Auth from "../auth/Auth";
import { Link } from "react-router-dom";

const MedicinePage = () => {
  const [getCompanies, setGetCompanies] = useState([]);
  const [medicine, setMedicine] = useState({
    name: "",
    medical_typ: "",
    buy_price: "",
    sell_price: "",
    s_gst: "",
    c_gst: "",
    batch_no: "",
    shelf_no: "",
    expire_date: "",
    mfg_date: "",
    company_id: "",
    description: "",
    in_stock_total: "",
    qty_in_strip: "",
    companyStatus: 0,
    dataLoaded: false,
  });
  // Handle Inputs

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setMedicine({ ...medicine, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setMedicine({
      companyStatus: 1,
    });
    CompanyAuth.companyCreate(
      medicine.name,
      medicine.medical_typ,
      medicine.buy_price,
      medicine.s_gst,
      medicine.c_gst,
      medicine.batch_no,
      medicine.shelf_no,
      medicine.expire_date,
      medicine.mfg_date,
      medicine.company_id,
      medicine.description,
      medicine.description,
      medicine.qty_in_strip,
      handleResponse
    );
    setMedicine({
      name: "",
      medical_typ: "",
      buy_price: "",
      sell_price: "",
      s_gst: "",
      c_gst: "",
      batch_no: "",
      shelf_no: "",
      expire_date: "",
      mfg_date: "",
      company_id: "",
      description: "",
      description: "",
      qty_in_strip: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to Add Company..") {
      setMedicine({
        companyStatus: 4,
      });
    } else {
      setMedicine({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (medicine.companyStatus === 0) {
      return "";
    } else if (medicine.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (medicine.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Company added Successful!</strong>
        </div>
      );
    } else if (medicine.companyStatus === 4) {
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
    setMedicine({ dataLoaded: true });
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="col-xs-12">{getMessage()}</div>
        <div className="block-header">
          <h2>MANAGE MEDICINE</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Add Medicine</h2>
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
                        placeholder="Enter Medicine Name"
                        value={medicine.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Medical Type.</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="medical_typ"
                        name="medical_typ"
                        className="form-control"
                        placeholder="Enter Medical Type ."
                        value={medicine.medical_typ}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Buy Price</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="buy_price"
                        name="buy_price"
                        className="form-control"
                        placeholder="Enter Buy Price"
                        value={medicine.buy_price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Sell Price</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="sell_price"
                        name="sell_price"
                        className="form-control"
                        placeholder="Enter Sell Price"
                        value={medicine.sell_price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">c_gst</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="c_gst"
                        name="c_gst"
                        className="form-control"
                        placeholder="Enter c_gst "
                        value={medicine.c_gst}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">s_gst</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="s_gst"
                        name="s_gst"
                        className="form-control"
                        placeholder="Enter s_gst"
                        value={medicine.s_gst}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Batch No.</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="batch_no"
                        name="batch_no"
                        className="form-control"
                        placeholder="Enter Batch No"
                        value={medicine.batch_no}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Shelf No.</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="shelf_no"
                        name="shelf_no"
                        className="form-control"
                        placeholder="Enter Shelf No."
                        value={medicine.shelf_no}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Expire Date</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="expire_date"
                        name="expire_date"
                        className="form-control"
                        placeholder="Enter Expire Date"
                        value={medicine.expire_date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Mfg Date</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="mfg_date"
                        name="mfg_date"
                        className="form-control"
                        placeholder="Enter Mfg Date"
                        value={medicine.mfg_date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Company</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="company_id"
                        name="company_id"
                        className="form-control"
                        placeholder="Enter Description"
                        value={medicine.s_gst}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">description</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="description"
                        name="description"
                        className="form-control"
                        placeholder="Enter Description"
                        value={medicine.description}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">In Stock Total</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="in_stock_total"
                        name="in_stock_total"
                        className="form-control"
                        placeholder="Enter In Stock Total"
                        value={medicine.in_stock_total}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address"> Qty In Strip </label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="qty_in_strip"
                        name="qty_in_strip"
                        className="form-control"
                        placeholder="Enter Qty In Strip"
                        value={medicine.qty_in_strip}
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
                    Add Medicine
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
                {medicine.dataLoaded == false ? (
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
                <h2>All Medicine</h2>
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

export default MedicinePage;
