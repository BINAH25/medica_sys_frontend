import React, { useState } from "react";
import Config from "../auth/Config";
import { Link } from "react-router-dom";
// function
const Sidebar = () => {
  const [show, setShow] = useState({
    defaultClass: "btn-group user-helper-dropdown",
  });

  const showLogoutMenu = () => {
    if (show.defaultClass === "btn-group user-helper-dropdown") {
      setShow({ defaultClass: "btn-group user-helper-dropdown open" });
    } else {
      setShow({ defaultClass: "btn-group user-helper-dropdown" });
    }
  };
  return (
    <section>
      <aside id="leftsidebar" className="sidebar">
        <div className="user-info">
          <div className="image">
            <img src="images/user.png" width="48" height="48" alt="User" />
          </div>
          <div className="info-container">
            <div
              className="name"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Codex
            </div>
            <div className="email">codex@gmail.com</div>
            <div className={show.defaultClass}>
              <i
                className="material-icons"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={showLogoutMenu}
              >
                keyboard_arrow_down
              </i>
              <ul className="dropdown-menu pull-right">
                <li>
                  <a href="" className=" waves-effect waves-block">
                    <i className="material-icons">input</i>Sign Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="menu">
          <div
            className="slimScrollDiv"
            style={{
              position: "relative",
              overflow: "hidden",
              width: "auto",
            }}
          >
            <ul className="list" style={{ overflow: "hidden", width: "auto" }}>
              {Config.sidebarItem.map((item, index) => (
                <li className="active" key={index}>
                  <Link
                    to={item.url}
                    className=" toggled waves-effect waves-block"
                  >
                    <i className="material-icons">{item.icons}</i>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div
              className="slimScrollBar"
              style={{
                background: "rgba(0, 0, 0, 0.5)",
                width: "4px",
                position: "absolute",
                top: "0px",
                opacity: "0.4",
                display: "none",
                borderRadius: "0px",
                zIndex: "99",
                right: "1px",
                height: "30px",
              }}
            ></div>
            <div
              className="slimScrollRail"
              style={{
                width: "4px",
                height: "100%",
                position: "absolute",
                top: "0px",
                display: "none",
                borderRadius: "0px",
                background: "rgb(51, 51, 51)",
                opacity: "0.2",
                zIndex: "90",
                right: "1px",
              }}
            ></div>
          </div>
        </div>

        <div className="legal">
          <div className="copyright">
            © 2022 <a href="#">Codex- Medical Store Management System</a>.
          </div>
          <div className="version">
            <b>Version: </b> 1.0.5
          </div>
        </div>
      </aside>
    </section>
  );
};

export default Sidebar;
