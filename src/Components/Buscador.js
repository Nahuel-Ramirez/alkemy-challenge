import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Buscador() {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value;
    if (keyword.trim().length === 0) {
      Swal.fire({
        title: "Atencion",
        text: "Tienes que escribir una palabra clave",
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "green",
      });
    } else if (keyword.trim().length < 4) {
      Swal.fire({
        title: "Atencion",
        text: "Tienes que escribir mas de 4 caracteres",
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "green",
      });
    } else {
      e.currentTarget.keyword.value = "";
      navigate(`/resultados?keyword=${keyword}`);
    }
  };

  return (
    <form className="d-flex align-items-center" onSubmit={submitHandler}>
      <label for="form-label">
        <input
          type="text"
          className="form-control"
          name="keyword"
          placeholder="Buscar pelicula"
        />
      </label>

      <button type="submit" className="btn btn-success mx-2">
        Buscar
      </button>
    </form>
  );
}

export default Buscador;
