import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import { Link } from "react-router-dom";
import EmployeeBankAuth from "../auth/EmployeeBankAuth";

const EmployeeBankPage = () => {
  const [getEmployeeBank, setGetEmployeeBank] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeBank, setEmployeeBank] = useState({
    bank_account_no: "",
    ifsc_no: "",
    employee_id: "",
    companyStatus: 0,
    dataLoaded: false,
  });
  // Handle Inputs

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setEmployeeBank({ ...employeeBank, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmployeeBank({
      companyStatus: 1,
    });
    EmployeeBankAuth.createEmployeeBank(
      employeeBank.bank_account_no,
      employeeBank.ifsc_no,
      employeeBank.employee_id,
      handleResponse
    );
    setEmployeeBank({
      bank_account_no: "",
      ifsc_no: "",
      employee_id: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to Add Employee Bank..") {
      setEmployeeBank({
        companyStatus: 4,
      });
    } else {
      setEmployeeBank({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (employeeBank.companyStatus === 0) {
      return "";
    } else if (employeeBank.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (employeeBank.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Employee Bank added Successful!</strong>
        </div>
      );
    } else if (employeeBank.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Employee Bank</strong>
        </div>
      );
    }
  };
  // get all employee banks
  useEffect(() => {
    getAllEmployeeBanks();
  }, []);
  let getAllEmployeeBanks = async () => {
    let res = await axios.get(Config.employeeBankUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetEmployeeBank(res.data);
    setEmployeeBank({ dataLoaded: true });
  };
  // get all employees
  useEffect(() => {
    getAllCompanies();
  }, []);
  let getAllCompanies = async () => {
    let res = await axios.get(Config.employeeUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setEmployees(res.data);
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="col-xs-12">{getMessage()}</div>
        <div className="block-header">
          <h2>MANAGE EMPLOYEE BANK</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Add Employee Bank</h2>
              </div>
              <div className="body">
                <form method="post" onSubmit={handleSubmit}>
                  <label htmlFor="email_address">BANK ACCOUNT NO</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="bank_account_no"
                        name="bank_account_no"
                        className="form-control"
                        placeholder="Enter Bank Account No"
                        value={employeeBank.bank_account_no}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">IFSC No.</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="ifsc_no"
                        name="ifsc_no"
                        className="form-control"
                        placeholder="Enter License No."
                        value={employeeBank.ifsc_no}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Employee</label>
                  <div className="form-group">
                    <select
                      className="form-control show-tick"
                      name="employee_id"
                      id="employee_id"
                      onChange={handleChange}
                      value={employeeBank.employee_id}
                    >
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name}
                        </option>
                      ))}
                    </select>
                  </div>{" "}
                  <br />
                  <button
                    type="submit"
                    className="btn btn-primary m-t-15 waves-effect btn-block"
                  >
                    Add Employee Bank
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
                {employeeBank.dataLoaded == false ? (
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
                <h2>All Employee Banks</h2>
              </div>
              <div className="body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>BANK ACCOUNT NO</th>
                      <th>IFSC NO.</th>
                      <th>EMPLOYEE ID</th>
                      <th>EMPLOYEE NAME</th>
                      <th>ADDED ON</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getEmployeeBank.map((employee_bank, index) => (
                      <tr key={index}>
                        <td>{employee_bank.id}</td>
                        <td>{employee_bank.bank_account_no}</td>
                        <td>{employee_bank.ifsc_no}</td>
                        <td>{employee_bank.employee_id}</td>
                        <td>{employee_bank.employee?.name}</td>
                        <td>
                          {new Date(employee_bank.added_on).toLocaleString()}
                        </td>
                        <td>
                          <Link
                            className="btn btn-block btn-primary"
                            to={`/employee_bank/${employee_bank.id}`}
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

export default EmployeeBankPage;
