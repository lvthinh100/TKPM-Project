import React from "react";
import "./Square.css";
//Render ra một hình vuông tùy chỉnh
// CSS
export default function Square({ size, color }) {
  return (
    <div
      style={{
        width: size + "px",
        height: size + "px",
        backgroundColor: color,
      }}
      className="square"
    ></div>
  );
}
