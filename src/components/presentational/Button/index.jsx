import "./Button.styles.css";

import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Button = ({ name, onClick }) => {

  return (
    <button onClick={onClick} className="submit-button">{name}</button>
  );
};

export default Button;