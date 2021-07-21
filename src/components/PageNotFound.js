import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound = () => (
  <ul>
    <li className="main-nav">
        <h1>(404): Page Not Found</h1>
        <p>The Page your search do not exist. Click the link below to return to the Home Page.</p>
        <NavLink to="/beaches">Go Home</NavLink>
    </li>
  </ul>
);

export default PageNotFound;