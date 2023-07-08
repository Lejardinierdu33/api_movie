import React from "react";
import logo from "./fauget.png";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <div>
      <nav>
        <img src={logo} alt="logo_site" />

        <ul>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/likepage"}>Coup de Coeur</NavLink>
        </ul>

        <button>I'm the Best</button>
      </nav>
    </div>
  );
}

export default Nav;
