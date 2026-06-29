import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

function Header() {
  const { admin, logoutAdmin } = useContext(AdminContext);

  return (
    <header className="header">
      <div className="admin-info">
        <h2>Panel del Administrador</h2>
        {admin && (
          <p>
            Bienvenido <strong>{admin.nombre}</strong> - Sector:{" "}
            <strong>{admin.sector}</strong>
          </p>
        )}
      </div>
      <button className="logout-btn" onClick={logoutAdmin}>
        Cerrar Sesión
      </button>
    </header>
  );
}

export default Header;
