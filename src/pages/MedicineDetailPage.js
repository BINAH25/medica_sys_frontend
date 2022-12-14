import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "../auth/Config";
import Auth from "../auth/Auth";
import { Link } from "react-router-dom";
import MedicineAuth from "../auth/MedicineAuth";
import { useParams } from "react-router-dom";
const MedicineDetailPage = () => {
  // getting url id using params
  const params = useParams();
  const id = params.id;
  // get all company
  const [getCompanies, setGetCompanies] = useState([]);
  // get single medicine
  const [medicine, setMedicine] = useState(null);
  // creating a new medicine
  const [updateMedicine, setUpdateMedicine] = useState({
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

    setUpdateMedicine({ ...updateMedicine, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateMedicine({
      companyStatus: 1,
    });
    MedicineAuth.editMedicine(
      updateMedicine.name,
      updateMedicine.medical_typ,
      updateMedicine.buy_price,
      updateMedicine.sell_price,
      updateMedicine.s_gst,
      updateMedicine.c_gst,
      updateMedicine.batch_no,
      updateMedicine.shelf_no,
      updateMedicine.expire_date,
      updateMedicine.mfg_date,
      updateMedicine.company_id,
      updateMedicine.description,
      updateMedicine.in_stock_total,
      updateMedicine.qty_in_strip,
      id,
      handleResponse
    );
    setUpdateMedicine({
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
    if (data.message === "Error, Failed to Update Medicine..") {
      setUpdateMedicine({
        companyStatus: 4,
      });
    } else {
      setUpdateMedicine({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (updateMedicine.companyStatus === 0) {
      return "";
    } else if (updateMedicine.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (updateMedicine.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Medicine added Successful!</strong>
        </div>
      );
    } else if (updateMedicine.companyStatus === 4) {
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
  // getting single medicine
  useEffect(() => {
    getSingleMedicines();
  }, [id]);
  const getSingleMedicines = async () => {
    let response = await axios.get(Config.medicineUrl + id, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setMedicine(response.data);
    setUpdateMedicine({
      name: response.data.name,
      medical_typ: response.data.medical_typ,
      buy_price: response.data.buy_price,
      sell_price: response.data.sell_price,
      s_gst: response.data.s_gst,
      c_gst: response.data.c_gst,
      batch_no: response.data.batch_no,
      shelf_no: response.data.shelf_no,
      expire_date: response.data.expire_date,
      mfg_date: response.data.mfg_date,
      company_id: "",
      description: response.data.description,
      in_stock_total: response.data.in_stock_total,
      qty_in_strip: response.data.qty_in_strip,
      dataLoaded: true,
    });
  };

  return <div>MedicineDetailPage</div>;
};

export default MedicineDetailPage;
