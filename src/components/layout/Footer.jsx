import { useState } from "react";
import { Box, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Footer = () => {
  const [mensaje] = useState(
    "© 2026 | Plataforma de Gestión de Clientes - Grupo 18 | FI UNJu",
  );

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "var(--violeta-oscuro)",
        color: "white",
        textAlign: "center",
        padding: "1rem",
        marginTop: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
      }}
    >
      {/* Texto principal */}
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        {mensaje}
      </Typography>

      {/* Fila de íconos decorativos */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1.2rem",
          marginTop: "0.8rem",
        }}
      >
        <FacebookIcon />
        <InstagramIcon />
        <LinkedInIcon />
        <GitHubIcon />
        <PinterestIcon />
      </Box>
    </Box>
  );
};

export default Footer;
