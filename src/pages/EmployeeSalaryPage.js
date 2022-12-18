import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Config from "../auth/Config";
import { Link } from "react-router-dom";
import EmployeeSalaryAuth from "../auth/EmployeeSalaryAuth";
// main function
const EmployeeSalaryPage = () => {
  const [getEmployeeSalaries, setGetEmployeeSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeSalary, setEmployeeSalary] = useState({
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

    setEmployeeSalary({ ...employeeSalary, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmployeeSalary({
      companyStatus: 1,
    });
    EmployeeSalaryAuth.createEmployeeSalary(
      employeeSalary.employee_id,
      employeeSalary.salary_date,
      employeeSalary.salary_amount,
      handleResponse
    );
    setEmployeeSalary({
      employee_id: "",
      salary_date: "",
      salary_amount: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to Add Employee Salary..") {
      setEmployeeSalary({
        companyStatus: 4,
      });
    } else {
      setEmployeeSalary({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (employeeSalary.companyStatus === 0) {
      return "";
    } else if (employeeSalary.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (employeeSalary.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Employee Salary added Successful!</strong>
        </div>
      );
    } else if (employeeSalary.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Employee Salary</strong>
        </div>
      );
    }
  };
  // get all employee salaries
  useEffect(() => {
    getAllEmployeeSalaries();
  }, []);
  let getAllEmployeeSalaries = async () => {
    let res = await axios.get(Config.employeeSalaryUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetEmployeeSalaries(res.data);
    setEmployeeSalary({ dataLoaded: true });
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
          <h2>MANAGE EMPLOYEE SALARY</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Add Employee Salary</h2>
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
                      value={employeeSalary.employee_id}
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
                        value={employeeSalary.salary_date}
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
                        value={employeeSalary.salary_amount}
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
                    Add Employee Salary
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
                {employeeSalary.dataLoaded == false ? (
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
                <h2>All Employee Salaries </h2>
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
                    {getEmployeeSalaries.map((salary, index) => (
                      <tr key={index}>
                        <td>{salary.id}</td>
                        <td>{salary.salary_amount}</td>
                        <td>{salary.salary_date}</td>
                        <td>{salary.employee_id}</td>
                        <td>{salary.employee?.name}</td>
                        <td>{new Date(salary.added_on).toLocaleString()}</td>
                        <td>
                          <Link
                            className="btn btn-block btn-primary"
                            to={`/employee_salary/${salary.id}`}
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

export default EmployeeSalaryPage;
