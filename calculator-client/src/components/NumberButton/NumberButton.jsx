import React from "react";
import "./NumberButton.css";

const isOperator = (val) => {
  return !isNaN(val) || val === "." || val === "=";
};

export const NumberButton = (props) => (
  <div
    className={`number-button-wrapper ${
      isOperator(props.children) ? null : "operator"
    }`}
    onClick={() => props.handleClick(props.children)}
  >
    {props.children}
  </div>
);
