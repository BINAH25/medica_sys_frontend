import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import EmployeeAuth from "../auth/EmployeeAuth";
import { Link } from "react-router-dom";
export const EmployeePage = () => {
  const [getEmployee, setGetEmployee] = useState([]);
  const [employee, setEmployee] = useState({
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

    setEmployee({ ...employee, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmployee({
      companyStatus: 1,
    });
    EmployeeAuth.createEmployee(
      employee.name,
      employee.joining_date,
      employee.phone,
      employee.address,
      handleResponse
    );
    setEmployee({
      name: "",
      joining_date: "",
      phone: "",
      address: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to add Employee..") {
      setEmployee({
        companyStatus: 4,
      });
    } else {
      setEmployee({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (employee.companyStatus === 0) {
      return "";
    } else if (employee.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (employee.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Employee added Successful!</strong>
        </div>
      );
    } else if (employee.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Employee </strong>
        </div>
      );
    }
  };
  //getting all Employees
  useEffect(() => {
    getAllEmployees();
  }, []);
  let getAllEmployees = async () => {
    let response = await axios.get(Config.employeeUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetEmployee(response.data);
    setEmployee({ dataLoaded: true });
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <h2>MANAGE EMPLOYEE</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Add Employee</h2>
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
                            value={employee.name}
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
                            value={employee.joining_date}
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
                            value={employee.phone}
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
                            value={employee.address}
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
                    Add Employee
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
                {employee.dataLoaded === false ? (
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
                    {getEmployee.map((employee, index) => (
                      <tr key={index}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.joining_date}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.address}</td>
                        <td>{new Date(employee.added_on).toLocaleString()}</td>
                        <td>
                          <Link
                            className="btn btn-block btn-primary"
                            to={`/employee/${employee.id}`}
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
