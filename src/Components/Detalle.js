import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Material UI
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { grey } from "@mui/material/colors";

// Style
import "./detalle.css";

function Detalle() {
  let token = sessionStorage.getItem("token");

  const [movieDetail, setMovieDetail] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [navigate, token]);

  let query = new URLSearchParams(window.location.search);
  let movieID = query.get("movieID");

  // llamado a la API
  useEffect(() => {
    const urlBase = `https://api.themoviedb.org/3/movie/${movieID}?api_key=a1176f4d55972caab3703aac17863229&language=es-ES`;
    axios
      .get(urlBase)
      .then((res) => {
        setMovieDetail(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieID, setMovieDetail]);

  return (
    <>
      {movieDetail && (
        <div className="detail-container">
          <Box className="img-detail">
            <img
              title="movieIMG"
              src={`https://image.tmdb.org/t/p/w400/${movieDetail.poster_path}`}
              alt="movie poster"
            />
          </Box>
          <Box className="body-detail">
            <CardContent className="overview">
              <Typography variant="h4">{movieDetail.title}</Typography>
              <span className="divider-black"></span>
              <Typography variant="h6">{movieDetail.overview}</Typography>
            </CardContent>

            <CardContent className="overview-data">
              <Box className="data-movie">
                <Typography variant="overline" component="h4">
                  Generos:
                </Typography>
                <Typography variant="body2" color="initial">
                  {movieDetail.genres.map((gen, index) => {
                    return (
                      <p className="gen" key={index}>
                        {gen.name}.
                      </p>
                    );
                  })}
                </Typography>
                <span className="divider"></span>
                <Typography variant="overline" component="h4">
                  Año:
                </Typography>
                <Typography variant="body2" color="initial">
                  {movieDetail.release_date}
                </Typography>
              </Box>
            </CardContent>

            <CardActions className="home-page">
              <Button variant="outlined" sx={{ color: grey[900] }}>
                <a
                  href={movieDetail.homepage}
                  target="_BLANK"
                  rel="noreferrer"
                  className="btn-hp"
                >
                  Home Page
                </a>
              </Button>
              <Button variant="outlined" sx={{ color: grey[900] }}>
                <Link to="/listado" className="btn-hp">
                  Volver al listado
                </Link>
              </Button>
            </CardActions>
          </Box>
        </div>
      )}
    </>
  );
}

export default Detalle;
