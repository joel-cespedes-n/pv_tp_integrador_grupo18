import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Box,
  Button,
} from "@mui/material";
import { AdminContext } from "../context/AdminContext";

const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useContext(AdminContext);

  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Fetch específico por ID
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/users/${id}`);
        if (!response.ok) throw new Error("Error al cargar cliente");
        const data = await response.json();
        setCliente(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCliente();
  }, [id]);

  // Simular DELETE
  const eliminarCliente = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar cliente");
      const data = await response.json();
      setSuccessMsg(`Cliente eliminado (ID: ${data.id})`);
      // Redirigir a lista de clientes
      setTimeout(() => navigate("/clientes"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: "bold", color: "var(--violeta-oscuro)" }}
      >
        Ficha Completa del Cliente
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {successMsg && <Alert severity="success">{successMsg}</Alert>}

      {cliente && (
        <Paper sx={{ p: 3, boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {cliente.name.firstname} {cliente.name.lastname}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>Email:</strong> {cliente.email}
            </Typography>
            <Typography variant="body1">
              <strong>Teléfono:</strong> {cliente.phone}
            </Typography>
          </Box>

          {/* Dirección completa */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Dirección:
            </Typography>
            <Typography variant="body2">
              {cliente.address.street} {cliente.address.number},{" "}
              {cliente.address.zipcode} - {cliente.address.city}
            </Typography>
          </Box>

          {/* Credenciales */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Credenciales:
            </Typography>
            <Typography variant="body2">
              <strong>Usuario:</strong> {cliente.username}
            </Typography>
            <Typography variant="body2">
              <strong>Contraseña:</strong> {cliente.password}
            </Typography>
          </Box>

          {/* Lógica de permisos */}
          {admin?.sector === "Gerencia" && (
            <Button
              variant="contained"
              color="error"
              onClick={eliminarCliente}
              sx={{ mt: 2 }}
            >
              Eliminar Cliente de la Base de Datos
            </Button>
          )}
        </Paper>
      )}
    </Container>
  );
};

export default DetalleCliente;
