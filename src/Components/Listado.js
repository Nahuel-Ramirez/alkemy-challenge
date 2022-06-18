import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// Styles
import "./listado.css";

function Listado() {
  const navigate = useNavigate();

  const irLogin = () => {
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      irLogin();
    }
  }, []);

  return (
    <>
      <div className="listado-container row">
        {/* Estructura Basica */}
        <div className="col-4">
          <div className="card h-100 w-75">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Movie title</h5>
              <p className="card-text">Review Movie</p>
              <Link to="" className="btn btn-secondary">
                Go somewhere
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Listado;
