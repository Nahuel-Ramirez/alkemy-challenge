import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    //Redirecciona al listado
    const irListado = () => {
      navigate("/listado");
    };

    //Accedo a los valores de los inputs
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //Validacion//
    if (email === "" || password === "") {
      Swal.fire({
        title: "Error",
        text: "¡Los campos no pueden estar vacios!",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    //Validacion email//
    if (email !== "" && !regexEmail.test(email)) {
      Swal.fire({
        title: "Error",
        text: "Debes escribir un correo electrónico válido.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    //Validacion de credenciales//
    if (email !== "challenge@alkemy.org" || password !== "react") {
      console.log("Credenciales invalidas");
      Swal.fire({
        title: "Credenciales inválidas",
        text: "El correo electrónico o contraseña son inválidos.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      confirmButtonText: "Ok",
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "¡Bienvenido!",
    });
    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        console.log(res.data);
        const tokenRecibido = res.data.token;
        localStorage.setItem("token", tokenRecibido);
        irListado();
        window.location.reload();
      });
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center mt-3 bg-light">
        <form onSubmit={submitHandler} className="w-50 text-align-center">
          <h2>Formulario de Login</h2>
          <div className="form-floating mb-3 mt-3 ">
            <input
              type="text"
              className="form-control"
              name="email"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Correo electrónico</label>
          </div>
          <div className="form-floating mb-3 ">
            <input
              type="password"
              name="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>
          <button type="submit" className="w-50 btn btn-dark">
            Ingresar
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
