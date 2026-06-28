import { AppBar, Toolbar, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";

const Nav = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "var(--violeta-medio)", 
        marginTop: "4px", 
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "center", gap: 3 }}>
        {/* Inicio */}
        <Button
          component={NavLink}
          to="/inicio"
          startIcon={<HomeIcon />}
          sx={{
            color: "white",
            "&.active": {
              backgroundColor: "white",
              color: "var(--violeta-oscuro)",
              borderRadius: "20px",
              px: 2,
            },
          }}
        >
          Inicio
        </Button>

        {/* Clientes */}
        <Button
          component={NavLink}
          to="/clientes"
          startIcon={<PeopleIcon />}
          sx={{
            color: "white",
            "&.active": {
              backgroundColor: "white",
              color: "var(--violeta-oscuro)",
              borderRadius: "20px",
              px: 2,
            },
          }}
        >
          Clientes
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
