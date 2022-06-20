import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Styles
// import "./listado.css";
import Swal from "sweetalert2";

function Listado() {
  const [moviesList, setMoviesList] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token === null) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const urlBase =
      "https://api.themoviedb.org/3/discover/movie?api_key=a1176f4d55972caab3703aac17863229&language=es-ES&page=1&with_watch_monetization_types=flatrate";
    axios
      .get(urlBase)
      .then((res) => {
        let apiData = res.data;
        setMoviesList(apiData.results);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Algo ha fallado",
          text: `${error.message}, disculpa las molestias.`,
          confirmButtonText: "Aceptar",
        });
        if (error) {
          navigate("/");
        }
      });
  }, [setMoviesList, navigate]);

  return (
    <>
      <div className="listado-container row">
        {/* Estructura Basica */}
        {moviesList.map((oneMovie, index) => {
          return (
            <div className="col-3 p-1" key={index}>
              <div className="card">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                  className="card-img-top "
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{oneMovie.title}</h5>
                  <p className="card-text">
                    {oneMovie.overview.substring(0, 150)}...
                  </p>
                  <Link
                    to={`/detalle?movieID=${oneMovie.id}`}
                    className="btn btn-secondary"
                  >
                    Ver detalle
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Listado;
