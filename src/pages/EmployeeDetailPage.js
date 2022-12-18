import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import EmployeeAuth from "../auth/EmployeeAuth";
import { useParams } from "react-router-dom";
const EmployeeDetailPage = () => {
  const params = useParams();
  const id = params.id;
  const [getEmployee, setGetEmployee] = useState(null);
  const [updateEmployee, setUpdateEmployee] = useState({
    name: "",
    joining_date: "",
    phone: "",
    address: "",
    companyStatus: 0,
    dataLoaded: false,
  });
  // Handle Inputs

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUpdateEmployee({ ...updateEmployee, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateEmployee({
      companyStatus: 1,
    });
    EmployeeAuth.editEmployee(
      updateEmployee.name,
      updateEmployee.joining_date,
      updateEmployee.phone,
      updateEmployee.address,
      id,
      handleResponse
    );
    setUpdateEmployee({
      name: "",
      joining_date: "",
      phone: "",
      address: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to Update Employee..") {
      setUpdateEmployee({
        companyStatus: 4,
      });
    } else {
      setUpdateEmployee({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (updateEmployee.companyStatus === 0) {
      return "";
    } else if (updateEmployee.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (updateEmployee.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Employee Updated Successful!</strong>
        </div>
      );
    } else if (updateEmployee.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Update Employee </strong>
        </div>
      );
    }
  };
  //getting single Employee
  useEffect(() => {
    getSingleEmployee();
  }, [id]);
  let getSingleEmployee = async () => {
    let response = await axios.get(Config.employeeUrl + id, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetEmployee(response.data);
    setUpdateEmployee({
      name: response.data.name,
      joining_date: response.data.joining_date,
      phone: response.data.phone,
      address: response.data.address,
    });
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <h2>UPDATE EMPLOYEE</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Update Employee</h2>
              </div>
              <div className="body">
                <form method="post" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6">
                      <label htmlFor="email_address">name</label>
                      <div className="form-group">
                        <div className="form-line">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Enter name"
                            value={updateEmployee.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="email_address">Joining Date</label>
                      <div className="form-group">
                        <div className="form-line">
                          <input
                            type="date"
                            id="joining_date"
                            name="joining_date"
                            className="form-control"
                            placeholder="Enter joining_date "
                            value={updateEmployee.joining_date}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <label htmlFor="email_address">Phone </label>
                      <div className="form-group">
                        <div className="form-line">
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="form-control"
                            placeholder="Enter phone "
                            value={updateEmployee.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="email_address">Address </label>
                      <div className="form-group">
                        <div className="form-line">
                          <input
                            type="text"
                            id="address"
                            name="address"
                            className="form-control"
                            placeholder="Enter address "
                            value={updateEmployee.address}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-primary m-t-15 waves-effect btn-block"
                  >
                    Update Employee
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
                {updateEmployee.dataLoaded === false ? (
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
                <h2>All Employees </h2>
              </div>
              <div className="body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>Employee Name</th>
                      <th>Date Joined</th>
                      <th>Phone NO.</th>
                      <th>Address</th>
                      <th>Added On</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getEmployee && (
                      <tr>
                        <td>{getEmployee.id}</td>
                        <td>{getEmployee.name}</td>
                        <td>{getEmployee.joining_date}</td>
                        <td>{getEmployee.phone}</td>
                        <td>{getEmployee.address}</td>
                        <td>
                          {new Date(getEmployee.added_on).toLocaleString()}
                        </td>
                        <td>
                          <button className="btn btn-block btn-primary">
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

export default EmployeeDetailPage;
