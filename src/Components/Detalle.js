import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Material UI
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";

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

  console.log(movieDetail);

  return (
    <>
      {movieDetail && (
        <Container maxWidth="xs">
          <img
            title="movieIMG"
            src={`https://image.tmdb.org/t/p/w400/${movieDetail.poster_path}`}
            alt="movie poster"
          />
          <CardContent>
            <Typography variant="h4" color="initial">
              Detalle de {movieDetail.title}
            </Typography>
            <Typography variant="h6" color="initial">
              {movieDetail.overview}
            </Typography>
            <Typography variant="body2" color="initial">
              Generos:
              {movieDetail.genres.map((gen, index) => {
                return (
                  <div key={index}>
                    <ul>
                      <li>{gen.name}</li>
                    </ul>
                  </div>
                );
              })}
            </Typography>
            <Typography variant="body2" color="initial">
              <p>Año:</p>
              {movieDetail.release_date}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" sx={{ color: grey[900] }}>
              <a href={movieDetail.homepage} target="_BLANK" rel="noreferrer">
                Home Page
              </a>
            </Button>
          </CardActions>
        </Container>
      )}
    </>
  );
}

export default Detalle;
