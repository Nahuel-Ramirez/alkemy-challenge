import React from "react";
import Swal from "sweetalert2";

function CerrarSesion() {
  const cerrarSesion = () => {
    sessionStorage.removeItem("token");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      confirmButtonText: "Ok",
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      title: "¡Adios!",
    });

    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  const token = sessionStorage.getItem("token");

  return (
    <>
      {token && (
        <button
          type="button"
          className="btn btn-dark btn-disabled me-2"
          onClick={cerrarSesion}
        >
          Cerrar Sesion
        </button>
      )}
    </>
  );
}

export default CerrarSesion;
