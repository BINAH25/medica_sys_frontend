import React, { useState } from "react";

const CompanyPages = () => {
  const [company, setCompany] = useState({
    username: "",
    password: "",
    loginStatus: 0,
  });
  // Handle Inputs

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setMsg({ ...msg, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg({
      loginStatus: 1,
    });
    Auth.login(msg.username, msg.password, handleResponse);
    setMsg({
      username: "",
      password: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "error during or invalid login details..") {
      setMsg({
        loginStatus: 4,
      });
    } else {
      setMsg({
        loginStatus: 3,
      });
      window.location = Config.homeUrl;
      //<Navigate to="/home" replace={true} />;
    }
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <h2>MANAGE COMPANY</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Add Company</h2>
              </div>
              <div className="body">
                <form>
                  <label htmlFor="email_address">Name</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Enter Company Name"
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">License No.</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="license_no"
                        name="license_no"
                        className="form-control"
                        placeholder="Enter License No."
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Address</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-control"
                        placeholder="Enter Company Address"
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Contact No.</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="contact_no"
                        name="contact_no"
                        className="form-control"
                        placeholder="Enter Contact No."
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Email</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter Company Email"
                      />
                    </div>
                  </div>
                  <label htmlFor="email_address">Description</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="description"
                        name="description"
                        className="form-control"
                        placeholder="Enter Description"
                      />
                    </div>
                  </div>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-primary m-t-15 waves-effect btn-block"
                  >
                    Add Company
                  </button>
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyPages;
