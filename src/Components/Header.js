import React from "react";
import { Link } from "react-router-dom";
import CerrarSesion from "./CerrarSesion";

function Header() {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-dark">
          <div className="container-fluid ">
            <Link className="navbar-brand text-light" to="/">
              AlkeChallenge
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNav">
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <Link
                    className="nav-link text-light btn btn-dark"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-light btn btn-dark"
                    to="/listado"
                  >
                    Listado
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link disabled text-white-50"
                    to="/suscripcion"
                  >
                    Suscripcion
                  </Link>
                </li>
                <li className="text-light">
                  <CerrarSesion />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;