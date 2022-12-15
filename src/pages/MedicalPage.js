import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import { Link } from "react-router-dom";
import MedicalAuth from "../auth/MedicalAuth";

const MedicalPage = () => {
  const [getMedicals, setGetMedicals] = useState([]);
  const [getMedicine, setGetMedicine] = useState([]);
  const [medical, setMedical] = useState({
    medicine_id: "",
    salt_name: "",
    salt_qty: "",
    salt_qty_type: "",
    description: "",
    companyStatus: 0,
    dataLoaded: false,
  });
  // Handle Inputs

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setMedical({ ...medical, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setMedical({
      companyStatus: 1,
    });
    MedicalAuth.createMedical(
      medical.medicine_id,
      medical.salt_name,
      medical.salt_qty,
      medical.salt_qty_type,
      medical.description,
      handleResponse
    );
    setMedical({
      medicine_id: "",
      salt_name: "",
      salt_qty: "",
      salt_qty_type: "",
      description: "",
    });
    console.log(medical);
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to add Medical..") {
      setMedical({
        companyStatus: 4,
      });
    } else {
      setMedical({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (medical.companyStatus === 0) {
      return "";
    } else if (medical.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (medical.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Medical added Successful!</strong>
        </div>
      );
    } else if (medical.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Medical </strong>
        </div>
      );
    }
  };
  //getting all medicals
  useEffect(() => {
    getAllMedicals();
  }, []);
  let getAllMedicals = async () => {
    let response = await axios.get(Config.medicalUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetMedicals(response.data);
    setMedical({ dataLoaded: true });
  };
  //getting all medicines
  useEffect(() => {
    getAllMedicines();
  }, []);
  let getAllMedicines = async () => {
    let res = await axios.get(Config.medicineUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetMedicine(res.data);
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="col-xs-12">{getMessage()}</div>
        <div className="block-header">
          <h2>MANAGE MEDICAL</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Add Medical</h2>
              </div>
              <div className="body">
                <form method="post" onSubmit={handleSubmit}>
                  <label htmlFor="email_address">Medicine</label>
                  <div className="form-group">
                    <select
                      className="form-control show-tick"
                      name="medicine_id"
                      id="medicine_id"
                      onChange={handleChange}
                      value={medical.medicine_id}
                    >
                      {getMedicine.map((medicine) => (
                        <option key={medicine.id} value={medicine.id}>
                          {medicine.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label htmlFor="email_address">salt_name </label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="salt_name"
                        name="salt_name"
                        className="form-control"
                        placeholder="Enter salt_name "
                        value={medical.salt_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">salt_qty </label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="salt_qty"
                        name="salt_qty"
                        className="form-control"
                        placeholder="Enter salt_qty ."
                        value={medical.salt_qty}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">salt_qty_type</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="salt_qty_type"
                        name="salt_qty_type"
                        className="form-control"
                        placeholder="Enter salt_qty_type."
                        value={medical.salt_qty_type}
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
                        placeholder="Enter description."
                        value={medical.description}
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
                    Add Medical
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
                {medical.dataLoaded == false ? (
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
                <h2>All Medical</h2>
              </div>
              <div className="body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>SALT NAME</th>
                      <th>SALT QTY</th>
                      <th>SALT QTY TYPE</th>
                      <th>DESCRIPTION</th>
                      <th>MEDICINE ID</th>
                      <th>MEDICINE NAME</th>
                      <th>ADDED ON</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getMedicals.map((medical, index) => (
                      <tr key={index}>
                        <td>{medical.id}</td>
                        <td>{medical.salt_name}</td>
                        <td>{medical.salt_qty}</td>
                        <td>{medical.salt_qty_type}</td>
                        <td>{medical.description}</td>
                        <td>{medical.medicine_id}</td>
                        <td>{medical.medicine.name}</td>
                        <td>{new Date(medical.added_on).toLocaleString()}</td>
                        <td>
                          <Link
                            className="btn btn-block btn-warning"
                            to={`/medical/${medical.id}`}
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

export default MedicalPage;
