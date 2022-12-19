import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import EmployeeSalaryAuth from "../auth/EmployeeSalaryAuth";
import { useParams } from "react-router-dom";
const EmployeeSalaryDetailPage = () => {
  //
  const params = useParams();
  const id = params.id;
  //
  const [getEmployeeSalaries, setGetEmployeeSalaries] = useState(null);
  //
  const [employees, setEmployees] = useState([]);
  //
  const [updateEmployeeSalary, setUpdateEmployeeSalary] = useState({
    employee_id: "",
    salary_date: "",
    salary_amount: "",
    companyStatus: 0,
    dataLoaded: false,
  });
  // Handle Inputs

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUpdateEmployeeSalary({ ...updateEmployeeSalary, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateEmployeeSalary({
      companyStatus: 1,
    });
    EmployeeSalaryAuth.editEmployeeSalary(
      updateEmployeeSalary.employee_id,
      updateEmployeeSalary.salary_date,
      updateEmployeeSalary.salary_amount,
      id,
      handleResponse
    );
    setUpdateEmployeeSalary({
      employee_id: "",
      salary_date: "",
      salary_amount: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to Update Employee Salary..") {
      setUpdateEmployeeSalary({
        companyStatus: 4,
      });
    } else {
      setUpdateEmployeeSalary({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (updateEmployeeSalary.companyStatus === 0) {
      return "";
    } else if (updateEmployeeSalary.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (updateEmployeeSalary.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Employee Salary Updated Successful!</strong>
        </div>
      );
    } else if (updateEmployeeSalary.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Update Employee Salary</strong>
        </div>
      );
    }
  };
  // get all employee salary by id
  useEffect(() => {
    getEmployeeSalary();
  }, []);
  let getEmployeeSalary = async () => {
    let res = await axios.get(Config.employeeSalaryUrl + id, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetEmployeeSalaries(res.data);
    setUpdateEmployeeSalary({
      employee_id: res.data.employee_id,
      salary_date: res.data.salary_date,
      salary_amount: res.data.salary_amount,
    });
  };
  // get all employees
  useEffect(() => {
    getAllEmployees();
  }, []);
  let getAllEmployees = async () => {
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
          <h2>UPDATE EMPLOYEE SALARY</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Update Employee Salary</h2>
              </div>
              <div className="body">
                <form method="post" onSubmit={handleSubmit}>
                  <label htmlFor="email_address">Employee</label>
                  <div className="form-group">
                    <select
                      className="form-control show-tick"
                      name="employee_id"
                      id="employee_id"
                      onChange={handleChange}
                      value={updateEmployeeSalary.employee_id}
                    >
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label htmlFor="email_address">SALARY DATE</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="date"
                        id="salary_date"
                        name="salary_date"
                        className="form-control"
                        placeholder="Enter salary date"
                        value={updateEmployeeSalary.salary_date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">SALARY AMOUNT</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="salary_amount"
                        name="salary_amount"
                        className="form-control"
                        placeholder="Enter salary_amount ."
                        value={updateEmployeeSalary.salary_amount}
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
                    Update Employee Salary
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
                <h2>Employee Salary </h2>
              </div>
              <div className="body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>SALARY DATE</th>
                      <th>SALARY AMOUNT</th>
                      <th>EMPLOYEE ID</th>
                      <th>EMPLOYEE NAME</th>
                      <th>ADDED ON</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getEmployeeSalaries && (
                      <tr>
                        <td>{getEmployeeSalaries.id}</td>
                        <td>{getEmployeeSalaries.salary_amount}</td>
                        <td>{getEmployeeSalaries.salary_date}</td>
                        <td>{getEmployeeSalaries.employee_id}</td>
                        <td>{getEmployeeSalaries.employee?.name}</td>
                        <td>
                          {new Date(
                            getEmployeeSalaries.added_on
                          ).toLocaleString()}
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

export default EmployeeSalaryDetailPage;
