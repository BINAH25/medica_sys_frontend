import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "../auth/Config";
import Auth from "../auth/Auth";
import { Link } from "react-router-dom";
import MedicineAuth from "../auth/MedicineAuth";

const MedicinePage = () => {
  // get all company
  const [getCompanies, setGetCompanies] = useState([]);
  // get all medicine
  const [getMedicine, setGetMedicine] = useState([]);
  // creating a new medicine
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
    MedicineAuth.createMedicine(
      medicine.name,
      medicine.medical_typ,
      medicine.buy_price,
      medicine.sell_price,
      medicine.s_gst,
      medicine.c_gst,
      medicine.batch_no,
      medicine.shelf_no,
      medicine.expire_date,
      medicine.mfg_date,
      medicine.company_id,
      medicine.description,
      medicine.in_stock_total,
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
    if (data.message === "Error, Failed to add Medicine..") {
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
          <strong>Medicine added Successful!</strong>
        </div>
      );
    } else if (medicine.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Medicine</strong>
        </div>
      );
    }
  };
  // getting all companies
  useEffect(() => {
    getAllCompanies();
  }, []);
  let getAllCompanies = async () => {
    let res = await axios.get(Config.companyUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetCompanies(res.data);
  };
  // getting all medicines
  useEffect(() => {
    getAllMedicines();
  }, []);
  const getAllMedicines = async () => {
    let response = await axios.get(Config.medicineUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetMedicine(response.data);
    setMedicine({ dataLoaded: true });
  };
  return (
    <section className="content">
      <div className="container-fluid">
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
                        type="date"
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
                        type="date"
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
                    <select
                      className="form-control show-tick"
                      name="company_id"
                      id="company_id"
                      onChange={handleChange}
                      value={medicine.company_id}
                    >
                      {getCompanies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
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
                <div className="col-xs-12">{getMessage()}</div>
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
                      <th>medical_typ</th>
                      <th>buy_price</th>
                      <th>sell_price</th>
                      <th>c_gst</th>
                      <th>s_gst</th>
                      <th>batch_no</th>
                      <th>shelf_no</th>
                      <th>expire_date</th>
                      <th>mfg_date</th>
                      <th>company_id</th>
                      <th>Description</th>
                      <th>in_stock_total</th>
                      <th>Added_on</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getMedicine.map((medicine, index) => (
                      <tr key={index}>
                        <td>{medicine.id}</td>
                        <td>{medicine.name}</td>
                        <td>{medicine.medical_typ}</td>
                        <td>{medicine.buy_price}</td>
                        <td>{medicine.sell_price}</td>
                        <td>{medicine.c_gst}</td>
                        <td>{medicine.s_gst}</td>
                        <td>{medicine.batch_no}</td>
                        <td>{medicine.shelf_no}</td>
                        <td>{medicine.expire_date}</td>
                        <td>{medicine.mfg_date}</td>
                        <td>{medicine.company?.name}</td>
                        <td>{medicine.description}</td>
                        <td>{medicine.in_stock_total}</td>
                        <td>{new Date(medicine.added_on).toLocaleString()}</td>
                        <td>
                          <Link
                            className="btn btn-block btn-warning"
                            to={`/company/${medicine.id}`}
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
