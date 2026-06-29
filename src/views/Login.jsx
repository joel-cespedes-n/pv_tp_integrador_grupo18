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

 return(
     <div>
      <h2>Login Administrador</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del Administrador"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <select value={sector} onChange={(e) => setSector(e.target.value)}>
          <option value="">Selecciona un sector</option>
          <option value="Soporte">Soporte</option>
          <option value="Gerencia">Gerencia</option>
        </select>
        <button type="submit">Ingresar</button>
    </form>
 </div>
 );
};
export default Login;