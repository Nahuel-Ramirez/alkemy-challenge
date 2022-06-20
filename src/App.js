// Libraries
import { Routes, Route } from "react-router-dom";
import Detalle from "./Components/Detalle";

//Components
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Listado from "./Components/Listado";
import Login from "./Components/Login";

// Styles
import "./css/bootstrap.min.css";

function App() {
  return (
    <>
      <Header />

      <div className="container">
        <Routes>
          <Route index element={<Login />} />
          <Route path="/listado" element={<Listado />} />
          <Route path="/detalle" element={<Detalle />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
