import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import { Link } from "react-router-dom";
import MedicalAuth from "../auth/MedicalAuth";
import { useParams } from "react-router-dom";
const MedicalDetailPage = () => {
  //getting the url parameter
  const params = useParams();
  const id = params.id;
  //getting single medical details
  const [getMedical, setGetMedical] = useState(null);
  // getting all medicines
  const [getMedicine, setGetMedicine] = useState([]);
  //updating the medical
  const [updateMedical, setUpdateMedical] = useState({
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

    setUpdateMedical({ ...updateMedical, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateMedical({
      companyStatus: 1,
    });
    MedicalAuth.editMedical(
      updateMedical.medicine_id,
      updateMedical.salt_name,
      updateMedical.salt_qty,
      updateMedical.salt_qty_type,
      updateMedical.description,
      id,
      handleResponse
    );
    setUpdateMedical({
      medicine_id: "",
      salt_name: "",
      salt_qty: "",
      salt_qty_type: "",
      description: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to Update Medical..") {
      setUpdateMedical({
        companyStatus: 4,
      });
    } else {
      setUpdateMedical({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (updateMedical.companyStatus === 0) {
      return "";
    } else if (updateMedical.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (updateMedical.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Medical added Successful!</strong>
        </div>
      );
    } else if (updateMedical.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Medical </strong>
        </div>
      );
    }
  };
  //getting single medical
  useEffect(() => {
    getSingleMedical();
  }, [getMedical, id]);
  let getSingleMedical = async () => {
    let response = await axios.get(Config.medicalUrl + id, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetMedical(response.data);
    setUpdateMedical({
      medicine_id: response.data.medicine_id,
      salt_name: response.data.salt_name,
      salt_qty: response.data.salt_qty,
      salt_qty_type: response.data.salt_qty_type,
      description: response.data.description,
      dataLoaded: true,
    });
  };
  //getting all medicines
  useEffect(() => {
    getAllMedicines();
  }, [id]);
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
          <h2>UPDATE MEDICAL</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2> Update Medical</h2>
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
                      value={updateMedical.medicine_id}
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
                        value={updateMedical.salt_name}
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
                        value={updateMedical.salt_qty}
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
                        value={updateMedical.salt_qty_type}
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
                        value={updateMedical.description}
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
                    Update Medical
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
                {updateMedical.dataLoaded === false ? (
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
                    {getMedical && (
                      <tr>
                        <td>{getMedical.id}</td>
                        <td>{getMedical.salt_name}</td>
                        <td>{getMedical.salt_qty}</td>
                        <td>{getMedical.salt_qty_type}</td>
                        <td>{getMedical.description}</td>
                        <td>{getMedical.medicine_id}</td>
                        <td>{getMedical.medicine.name}</td>
                        <td>
                          {new Date(getMedical.added_on).toLocaleString()}
                        </td>
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

export default MedicalDetailPage;
