import React, { useEffect, useState } from "react";
import Auth from "../auth/Auth";
import "adminbsb-materialdesign/plugins/bootstrap/css/bootstrap.css";
import "adminbsb-materialdesign/plugins/node-waves/waves.css";
import "adminbsb-materialdesign/plugins/animate-css/animate.css";
import "adminbsb-materialdesign/css/style.css";
import { Navigate } from "react-router-dom";
import Config from "../auth/Config";
// main function
const Login = () => {
  const [msg, setMsg] = useState({
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

  // getting login message
  const getMessage = () => {
    if (msg.loginStatus === 0) {
      return "";
    } else if (msg.loginStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (msg.loginStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Login Successfull!</strong>
        </div>
      );
    } else if (msg.loginStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Invalid Login Details</strong>
        </div>
      );
    }
  };
  document.body.className = "login-page";
  return (
    <>
      <div className="login-box">
        <div className="logo">
          <a href="">Medical Store</a>
          <small>Management System</small>
        </div>
        <div className="card">
          <div className="body">
            <form method="POST" onSubmit={handleSubmit}>
              <div className="msg">Sign in to start your session</div>
              <div className="input-group">
                <div className="form-line">
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    required
                    value={msg.username}
                    onChange={handleChange}
                    autoFocus
                  />
                </div>
              </div>
              <div className="input-group">
                <div className="form-line">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={msg.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-8 p-t-5">
                  <input
                    type="checkbox"
                    name="rememberme"
                    id="rememberme"
                    className="filled-in chk-col-pink"
                  />
                  <label htmlFor="rememberme">Remember Me</label>
                </div>
                <div className="col-xs-4">
                  <button
                    className="btn btn-block bg-pink waves-effect"
                    type="submit"
                  >
                    SIGN IN
                  </button>
                </div>
              </div>
              <div className="row m-t-15 m-b--20">
                <div className="col-xs-6">
                  <a href="">Register Now!</a>
                </div>
                <div className="col-xs-6 align-right">
                  <a href="">Forgot Password?</a>
                </div>
                <div className="col-xs-12">{getMessage()}</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
