import { CartWidget } from "./CartWidget";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";

import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <nav className="container">
        <Link to="/">
          <img className="icon" src={logo} alt="logo" />
        </Link>

        <NavLink to="/">Home</NavLink>
        <NavLink to="/products/Pedales">Pedales</NavLink>
        <NavLink to="/products/Multi-Efectos">Multi-Efectos</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
        <CartWidget />
      </nav>
    </>
  );
};

export default NavBar;
