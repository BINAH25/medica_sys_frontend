import React from "react";

const Navbar = ({ onBarClick }) => {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="navbar-header">
          <a href="#" className="bars" onClick={onBarClick}></a>
          <a className="navbar-brand" href="">
            Medical Store Management System
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
