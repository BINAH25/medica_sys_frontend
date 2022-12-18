import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import EmployeeBankAuth from "../auth/EmployeeBankAuth";
import { useParams } from "react-router-dom";
// main function
export const EmployeeBankDetailPage = () => {
  // getting the url params or id
  const params = useParams();
  const id = params.id;
  // getting employee bank
  const [getEmployeeBank, setGetEmployeeBank] = useState(null);
  // getting all employees
  const [employees, setEmployees] = useState([]);
  // updating the employee bank
  const [updateEmployeeBank, setUpdateEmployeeBank] = useState({
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

    setUpdateEmployeeBank({ ...updateEmployeeBank, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateEmployeeBank({
      companyStatus: 1,
    });
    EmployeeBankAuth.editEmployeeBank(
      updateEmployeeBank.bank_account_no,
      updateEmployeeBank.ifsc_no,
      updateEmployeeBank.employee_id,
      id,
      handleResponse
    );
    setUpdateEmployeeBank({
      bank_account_no: "",
      ifsc_no: "",
      employee_id: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to Update Employee Bank..") {
      setUpdateEmployeeBank({
        companyStatus: 4,
      });
    } else {
      setUpdateEmployeeBank({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (updateEmployeeBank.companyStatus === 0) {
      return "";
    } else if (updateEmployeeBank.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (updateEmployeeBank.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Employee Bank Updated Successful!</strong>
        </div>
      );
    } else if (updateEmployeeBank.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Update Employee Bank</strong>
        </div>
      );
    }
  };
  // get  employee bank by id
  useEffect(() => {
    getEmployeeById();
  }, [id]);
  let getEmployeeById = async () => {
    let res = await axios.get(Config.employeeBankUrl + id, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetEmployeeBank(res.data);
    setUpdateEmployeeBank({
      bank_account_no: res.data.bank_account_no,
      ifsc_no: res.data.ifsc_no,
      employee_id: res.data.employee_id,
    });
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
          <h2>UPDATE EMPLOYEE BANK</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Update Employee Bank</h2>
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
                        value={updateEmployeeBank.bank_account_no}
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
                        value={updateEmployeeBank.ifsc_no}
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
                      value={updateEmployeeBank.employee_id}
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
                    Update Employee Bank
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
                <h2>Employee Bank</h2>
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
                    {getEmployeeBank && (
                      <tr>
                        <td>{getEmployeeBank.id}</td>
                        <td>{getEmployeeBank.bank_account_no}</td>
                        <td>{getEmployeeBank.ifsc_no}</td>
                        <td>{getEmployeeBank.employee_id}</td>
                        <td>{getEmployeeBank.employee?.name}</td>
                        <td>
                          {new Date(getEmployeeBank.added_on).toLocaleString()}
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
