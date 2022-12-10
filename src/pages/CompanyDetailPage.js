import React from "react";

const CompanyDetailPage = () => {
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="col-xs-12"></div>
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
                <form method="post">
                  <label htmlFor="email_address">Name</label>
                  <div className="form-group">
                    <div className="form-line">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Enter Company Name"
                        required
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
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
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>All Companies</h2>
              </div>
              <div className="body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>NAME</th>
                      <th>License NO.</th>
                      <th>Address</th>
                      <th>Contact</th>
                      <th>Email</th>
                      <th>Description</th>
                      <th>Added On</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyDetailPage;
