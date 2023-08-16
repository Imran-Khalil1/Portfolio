import React, { useState } from "react";
import { Link } from "react-router-dom";
import { headerLinks } from "../assets/data";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/logo.png";
import { FaUserAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { BiMenu } from "react-icons/bi";
import Sidebar from "./Sidebar";

function Header() {
  const [showsidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("coWorkToken");
  const handleLogout = () => {
    localStorage.removeItem("coWorkToken");
    localStorage.removeItem("coWorkUser");
    localStorage.removeItem("coworkRole");
    navigate("/login");
  };
  return (
    <div className="header__main">
      {window.innerWidth < 768 && (
        <i className="menuuu">
          <BiMenu />
        </i>
      )}
      <img
        src={img1}
        className="logo"
        alt="logo"
        onClick={() => navigate("/")}
      ></img>
      <input className="input-header" placeholder="Search here"></input>
      <div className="list-header">
        {headerLinks?.map((link) => {
          return (
            <Link to={link?.url} className="header_link">
              {link?.name}
            </Link>
          );
        })}
        {token ? (
          <>
            <i
              className="header_links"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/profile")}
            >
              <FaUserAlt />
            </i>
            <i
              className="header_links"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              <FiLogOut />
            </i>
          </>
        ) : (
          <Link to="/login" className="header_links">
            Login
          </Link>
        )}
      </div>
      {showsidebar === true ? <Sidebar /> : null}
    </div>
  );
}

export default Header;
