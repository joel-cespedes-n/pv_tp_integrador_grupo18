import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const Header = () => {
  const { admin, logoutAdmin } = useContext(AdminContext);

  return (
    <AppBar position="static" color="transparent" className="header-appbar">
      <Toolbar className="header">
        {/* Logo */}
        <Box className="header-logo">
          <img src={logo} alt="Logo Grupo 18" />
        </Box>

        {/* Título */}
        <Typography className="header-title">
          Plataforma de Gestión de Clientes
        </Typography>

        {/* Tarjeta usuario/login */}
        {admin ? (
          <Box className="user-card">
            <Box className="user-info">
              <Typography className="user-name">{admin.nombre}</Typography>
              <Typography className="user-sector">{admin.sector}</Typography>
            </Box>
            <IconButton onClick={logoutAdmin} className="logout-btn">
              <LogoutIcon /> {/* Logo de cerrar sesión */}
            </IconButton>
          </Box>
        ) : (
          <Box component={Link} to="/login" className="user-card">
            <IconButton className="login-btn">
              <AccountCircleIcon />{" "}
              {/* Logo de perfil para iniciar sesión */}
            </IconButton>
            <Typography className="login-text">Iniciar Sesión</Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
