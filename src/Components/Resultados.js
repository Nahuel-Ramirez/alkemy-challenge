import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Resultados() {
  const navigate = useNavigate();

  let query = new URLSearchParams(window.location.search);
  let keyword = query.get("keyword");

  const [moviesResults, setMmoviesResults] = useState([]);

  useEffect(() => {
    const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=a1176f4d55972caab3703aac17863229&language=es-ES&query=${keyword}`;
    axios
      .get(endpoint)
      .then((res) => {
        const dataMovies = res.data.results;
        if (dataMovies.length === 0) {
          Swal.fire({
            title: "No se encontro un resultado",
            icon: "error",
          });
          navigate("/listado");
        }
        setMmoviesResults(dataMovies);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [keyword, navigate]);

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (token === null) {
      Swal.fire({
        text: "¡Necesitas loguearte primero!",
        icon: "error",
      });
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <h3>Resultados para {keyword}</h3>

      <div className="listado-container">
        {/* Estructura Basica */}
        {moviesResults.map((oneMovie, index) => {
          return (
            <div className="p-1" key={index}>
              <div className="card">
                <div className="card-movie">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{oneMovie.title}</h5>
                    <span className="divider"></span>
                    <p className="card-text">
                      {oneMovie.overview.substring(0, 150)}...
                    </p>
                    <div>
                      <Link
                        to={`/detalle?movieID=${oneMovie.id}`}
                        className="btn btn-secondary"
                      >
                        Ver detalle
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Resultados;
