import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import BillDetailAuth from "../auth/BillDetailAuth";
const BillDetailPage = () => {
  const [getBillDetail, setGetBillDetail] = useState([]);
  const [medicine, setMedicine] = useState([]);
  const [bill, setBill] = useState([]);
  const [billDetail, setBillDetail] = useState({
    bill_id: "",
    medicine_id: "",
    qty: "",
    companyStatus: 0,
    dataLoaded: false,
  });
  // Handle Inputs

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setBillDetail({ ...billDetail, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setBillDetail({
      companyStatus: 1,
    });
    BillDetailAuth.createBillDetail(
      billDetail.bill_id,
      billDetail.medicine_id,
      billDetail.qty,
      handleResponse
    );
    setBillDetail({
      bill_id: "",
      medicine_id: "",
      qty: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to add BillDetail..") {
      setBillDetail({
        companyStatus: 4,
      });
    } else {
      setBillDetail({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (billDetail.companyStatus === 0) {
      return "";
    } else if (billDetail.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (billDetail.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>billDetail added Successful!</strong>
        </div>
      );
    } else if (billDetail.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Bill </strong>
        </div>
      );
    }
  };
  //getting all Bills
  useEffect(() => {
    getAllBills();
  }, []);
  let getAllBills = async () => {
    let response = await axios.get(Config.billUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setBill(response.data);
  };
  //getting all Medicine
  useEffect(() => {
    getAllMedicine();
  }, []);
  let getAllMedicine = async () => {
    let res = await axios.get(Config.medicineUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setMedicine(res.data);
  };
  //getting all Bill Details
  useEffect(() => {
    getAllBillDetails();
  }, []);
  let getAllBillDetails = async () => {
    let bill_details = await axios.get(Config.medicineUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetBillDetail(bill_details.data);
    setBillDetail({ dataLoaded: true });
  };

  return <div>BillDetailPage</div>;
};

export default BillDetailPage;
