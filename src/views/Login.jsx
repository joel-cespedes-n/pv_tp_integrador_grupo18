import { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginAdmin } = useContext(AdminContext);
  const [nombre, setNombre] = useState("");
  const [sector, setSector] = useState("Soporte");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && sector) {
      loginAdmin(nombre, sector);
      navigate("/inicio");
    } else {
      alert("Completa todos los campos");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login Administrador</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Nombre del Administrador"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="login-input"
        />
        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="login-select"
        >
          <option value="">Selecciona un sector</option>
          <option value="Soporte">Soporte</option>
          <option value="Gerencia">Gerencia</option>
        </select>
        <button type="submit" className="login-button">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
