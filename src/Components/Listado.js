import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Styles
import "./listado.css";
import Swal from "sweetalert2";

function Listado() {
  const urlIcon1 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAATpJREFUSEvFleFRwzAMhb9OQEeACYAJChuwAXQCGIVOUNiADYANYAIYASYo93JSTnWd2PFdiv+ksaL39J5kd8HMazEzPv9GcAPcAhem8BvYAC/2rvg9cGrvH8BziPfGpAqWwBYQQG692ebVQFwFrIEfj6cEquQc+AUegAj4CJxYosf1vZaUelx7lzmCO6teyZLeV2EfS10kzMVlpYqQiiflRQVKXsVgw4R5ke9AZ2Mk2BngGaBKWpaUf1lih31Ugtktcv/UPNmUNrFkmYZA9uiZbbIAfEz1vJ5AItBXG9fPcEAPrgofRZ2FWpIUXNMzeNCkYgrJKHg6RdHjGpIi+BhBSUkVeIlgiET7saF7nqejVvN/kNrll5umZRS8RoEXFEm0VwU+hSDapd/FynPXdemkNsVretAEfDQFf3ZDVxl/VBnpAAAAAElFTkSuQmCC";
  const urlIcon2 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAASFJREFUSEvFldGRgkAMhv8wrs+WcB2c0MBZgh2oFVwtVqB2YAleA4AdWILPxiE3u4IDyrKArPIEZPi+STYJBM8XeebjM4JkPJ5nWbYgomme4YmI1uHlstfPOi4ivwC+9LOIpEEQ7Ip4uSqVDBJgko1GGyKaW0p3yN/P6uIisg+u11UInIt4RRArlQL4fvFc0og5fBIkSi0F2LwIN58TsAqZt/n9DRkrpdP/GUIA4C9iNmW8lyhWSgaCG0zEbNhvFfgtkfdDzg96iDY9RszFgFZXhR40uXVT31k4EvPMOmhmDfSXPMErXVRu0R6SWrhV0DETK7xR0FLSCHcKHBInvJXAImkFby14kOCxFZt2WKdfpu4uDSv3uWtBdhK4YHVx74J/9yeBGWZXZ0IAAAAASUVORK5CYII=";

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
      <div className="listado-container">
        {/* Estructura Basica */}
        {moviesList.map((oneMovie, index) => {
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

export default Listado;
