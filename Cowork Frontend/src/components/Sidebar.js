import React from "react";
import "./sidebar.scss";
import img1 from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { sidebarLinks } from "../assets/data";

function Sidebar() {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  const handleUrl = (url) => {
    navigate(url);
  };
  return (
    <div className="sidebar_outer">
      <div className="sidebar_inner">
        <p>
          <AiOutlineCloseCircle />
        </p>
        <div className="logo___">
          <img src={img1} onClick={handleHome} />
        </div>
        {sidebarLinks?.map((link) => {
          return (
            <div className="card" onClick={() => handleUrl(link?.url)}>
              <p>{link}</p>
              <p>{link?.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
