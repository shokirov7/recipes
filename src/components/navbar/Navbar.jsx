import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/ThemeContext";

function Navbar() {

  const {color} = useContext(Context)
  const {opened} = useContext(Context)
  const {isOpened} = useContext(Context)
  return (
    <div className="navbar" style={{ backgroundColor: color }}>
      <Link to="/" className="nav_logo" onClick={()=> {
        isOpened(false)
      }}>
        Cooking Amirxon
      </Link>
      <div className="nav_btn" onClick={()=> {
        isOpened(!opened)
      }}>
        <Link to={opened ? "/" : "/create"}>{opened ? "Back" : "Create"}</Link>
      </div>
    </div>
  );
}

export default Navbar;
