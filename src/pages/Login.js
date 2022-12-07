import React, { useEffect, useState } from "react";
import Auth from "../auth/Auth";
import "adminbsb-materialdesign/plugins/bootstrap/css/bootstrap.css";
import "adminbsb-materialdesign/plugins/node-waves/waves.css";
import "adminbsb-materialdesign/plugins/animate-css/animate.css";
import "adminbsb-materialdesign/css/style.css";
const Login = () => {
  const [msg, setMsg] = useState({
    username: "",
    password: "",
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
    Auth.login(msg.username, msg.password);
    setMsg({
      username: "",
      password: "",
    });
  };
  document.body.className = "login-page";
  return (
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
