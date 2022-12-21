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

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <h2>MANAGE BILLDETAILS</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Add BillDetail</h2>
              </div>
              <div className="body">
                <form method="post" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-4">
                      <label htmlFor="email_address">Bill</label>
                      <div className="form-group">
                        <div className="form-line">
                          <select
                            className="form-control show-tick"
                            name="bill_id"
                            id="bill_id"
                            value={billDetail.customer_id}
                            onChange={handleChange}
                          >
                            {bill.map((bill, index) => (
                              <option key={index} value={bill.id}>
                                {bill.customer?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <label htmlFor="email_address">medicine_id</label>
                      <div className="form-group">
                        <div className="form-line">
                          <select
                            className="form-control show-tick"
                            name="medicine_id"
                            id="medicine_id"
                            value={billDetail.customer_id}
                            onChange={handleChange}
                          >
                            {medicine.map((medicine, index) => (
                              <option key={index} value={medicine.id}>
                                {medicine.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <br />
                  <button
                    type="submit"
                    className="btn btn-primary m-t-15 waves-effect btn-block"
                  >
                    Add BillDetail
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
                {bill.dataLoaded === false ? (
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
                <h2>All Bill Details</h2>
              </div>
              <div className="body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>Bill ID</th>
                      <th>Bill Qty</th>
                      <th>Medicine ID</th>
                      <th>Added On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getBillDetail.map((billDetail, index) => (
                      <tr key={index}>
                        <td>{billDetail.id}</td>
                        <td>{billDetail.bill_id}</td>
                        <td>{billDetail.qty}</td>
                        <td>{billDetail.medicine_id}</td>
                        <td>
                          {new Date(billDetail.added_on).toLocaleString()}
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

export default BillDetailPage;
