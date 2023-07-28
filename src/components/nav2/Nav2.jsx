import React, { useContext } from "react";
import { Context } from "../../context/ThemeContext";
import "./Nav2.css";

function Nav2() {
  const { changeColor, mode, changeMode } = useContext(Context);

  return (
    <div className="nav2">
      <label
        className="switch"
        onChange={() => {
          changeMode(!mode);
        }}
      >
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
      <div className="colors_holder">
        <button
          onClick={() => {
            changeColor("rgb(168, 25, 25)");
          }}
          className="nav2_colors"
        ></button>
        <button
          onClick={() => {
            changeColor("rgb(19, 88, 66)");
          }}
          className="nav2_colors"
        ></button>
        <button
          onClick={() => {
            changeColor("#1b1b1b");
          }}
          className="nav2_colors"
        ></button>
        <button
          onClick={() => {
            changeColor("rgb(62, 42, 77)");
          }}
          className="nav2_colors"
        ></button>
        <button
          onClick={() => {
            changeColor("rgb(133, 97, 47)");
          }}
          className="nav2_colors"
        ></button>
      </div>
    </div>
  );
}

export default Nav2;
