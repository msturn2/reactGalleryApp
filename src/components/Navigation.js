import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => (
  <nav className="main-nav">
    <ul>
      <li>
        <NavLink to="/beaches">Beaches</NavLink>
      </li>
      <li>
        <NavLink to="/waves">Waves</NavLink>
      </li>
      <li>
        <NavLink to="/sunrises">Sunrises</NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;