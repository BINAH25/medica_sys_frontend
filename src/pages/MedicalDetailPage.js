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
  }, []);
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
  }, []);
  let getAllMedicines = async () => {
    let res = await axios.get(Config.medicineUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetMedicine(res.data);
  };

  return <div>MedicalDetailPage</div>;
};

export default MedicalDetailPage;
