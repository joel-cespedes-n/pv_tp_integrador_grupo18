import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const ListaClientes = () => {
  // Estados principales
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  // Estados para agregar cliente
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    name: { firstname: "", lastname: "" },
    email: "",
    phone: "",
    address: { city: "", street: "", number: "", zipcode: "" },
  });
  const [notificacionAbierta, setNotificacionAbierta] = useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");

  // Funciones del modal
  const abrirModal = () => {
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setNuevoCliente({
      name: { firstname: "", lastname: "" },
      email: "",
      phone: "",
      address: { city: "", street: "", number: "", zipcode: "" },
    });
  };

  // Manejo del formulario
  const manejarCambioInput = (evento) => {
    const { name, value } = evento.target;

    if (name === "firstname" || name === "lastname") {
      setNuevoCliente({
        ...nuevoCliente,
        name: {
          ...nuevoCliente.name,
          [name]: value,
        },
      });
    } else if (
      name === "city" ||
      name === "street" ||
      name === "number" ||
      name === "zipcode"
    ) {
      setNuevoCliente({
        ...nuevoCliente,
        address: {
          ...nuevoCliente.address,
          [name]: value,
        },
      });
    } else {
      setNuevoCliente({
        ...nuevoCliente,
        [name]: value,
      });
    }
  };

  // Agregar cliente
  const agregarCliente = async () => {
    try {
      const respuesta = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoCliente),
      });

      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }

      const clienteAgregado = await respuesta.json();

      const maxId = clientes.reduce((max, c) => Math.max(max, c.id), 0);
      const nuevoId = maxId + 1;

      const clienteCompleto = {
        id: nuevoId,
        name: {
          firstname:
            clienteAgregado.name?.firstname || nuevoCliente.name.firstname,
          lastname:
            clienteAgregado.name?.lastname || nuevoCliente.name.lastname,
        },
        email: clienteAgregado.email || nuevoCliente.email,
        phone: clienteAgregado.phone || nuevoCliente.phone,
        address: {
          city: clienteAgregado.address?.city || nuevoCliente.address.city,
          street:
            clienteAgregado.address?.street || nuevoCliente.address.street,
          number:
            clienteAgregado.address?.number || nuevoCliente.address.number,
          zipcode:
            clienteAgregado.address?.zipcode || nuevoCliente.address.zipcode,
        },
      };

      setClientes([...clientes, clienteCompleto]);
      setClientesFiltrados([...clientesFiltrados, clienteCompleto]);

      setMensajeNotificacion(
        `Cliente ${clienteCompleto.name.firstname} ${clienteCompleto.name.lastname} agregado con éxito!`,
      );
      setNotificacionAbierta(true);

      cerrarModal();
    } catch (error) {
      setMensajeNotificacion(
        "Error al agregar el cliente. Por favor, intente nuevamente.",
      );
      setNotificacionAbierta(true);
    }
  };

  const cerrarNotificacion = () => {
    setNotificacionAbierta(false);
  };

  // Obtener clientes de la API
  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        setCargando(true);
        const respuesta = await fetch("https://fakestoreapi.com/users");

        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        setClientes(datos);
        setClientesFiltrados(datos);
        setError(null);
      } catch (error) {
        setError(
          "No se pudo obtener la lista de clientes. Por favor, inténtelo de nuevo más tarde.",
        );
        setClientes([]);
        setClientesFiltrados([]);
      } finally {
        setCargando(false);
      }
    };

    obtenerClientes();
  }, []);

  // Filtrar clientes
  const manejarBusqueda = (evento) => {
    const texto = evento.target.value;
    setTerminoBusqueda(texto);

    if (texto.trim() === "") {
      setClientesFiltrados(clientes);
      return;
    }

    const busqueda = texto.toLowerCase();
    const resultados = clientes.filter((cliente) => {
      const nombreCompleto =
        `${cliente.name?.firstname || ""} ${cliente.name?.lastname || ""}`.toLowerCase();
      const ciudad = cliente.address?.city?.toLowerCase() || "";
      return nombreCompleto.includes(busqueda) || ciudad.includes(busqueda);
    });

    setClientesFiltrados(resultados);
  };

  // Renderizado condicional
  if (cargando) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  // ===== RENDER PRINCIPAL =====
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Título */}
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Clientes
      </Typography>

      {/* Botón para agregar cliente */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={abrirModal}
          startIcon={<AddIcon />}
        >
          Agregar Cliente
        </Button>
      </Box>

      {/* Buscador */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por apellido o ciudad..."
          value={terminoBusqueda}
          onChange={manejarBusqueda}
          size="small"
        />
      </Box>

      {/* Tabla de clientes */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Nombre Completo</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Teléfono</strong>
              </TableCell>
              <TableCell>
                <strong>Ciudad</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Acciones</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientesFiltrados.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell>{cliente.id}</TableCell>
                <TableCell>
                  {cliente.name?.firstname || "Sin nombre"}{" "}
                  {cliente.name?.lastname || ""}
                </TableCell>
                <TableCell>{cliente.email || "Sin email"}</TableCell>
                <TableCell>{cliente.phone || "Sin teléfono"}</TableCell>
                <TableCell>{cliente.address?.city || "Sin ciudad"}</TableCell>
                <TableCell align="center">
                  <Button
                    component={Link}
                    to={`/clientes/${cliente.id}`}
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--violeta-medio)",
                      "&:hover": { backgroundColor: "var(--violeta-oscuro)" },
                    }}
                  >
                    Ver Ficha Completa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Mensaje cuando no hay resultados */}
      {clientesFiltrados.length === 0 && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="info">
            No se encontraron clientes que coincidan con la búsqueda.
          </Alert>
        </Box>
      )}

      {/* Modal para agregar cliente */}
      <Dialog open={modalAbierto} onClose={cerrarModal} maxWidth="md" fullWidth>
        <DialogTitle>Agregar Nuevo Cliente</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Datos Personales
            </Typography>
            <Grid container spacing={2}>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="firstname"
                  value={nuevoCliente.name.firstname}
                  onChange={manejarCambioInput}
                  required
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Apellido"
                  name="lastname"
                  value={nuevoCliente.name.lastname}
                  onChange={manejarCambioInput}
                  required
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={nuevoCliente.email}
                  onChange={manejarCambioInput}
                  required
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  name="phone"
                  value={nuevoCliente.phone}
                  onChange={manejarCambioInput}
                  required
                />
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Dirección
            </Typography>
            <Grid container spacing={2}>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Calle"
                  name="street"
                  value={nuevoCliente.address.street}
                  onChange={manejarCambioInput}
                  required
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Número"
                  name="number"
                  value={nuevoCliente.address.number}
                  onChange={manejarCambioInput}
                  required
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ciudad"
                  name="city"
                  value={nuevoCliente.address.city}
                  onChange={manejarCambioInput}
                  required
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Código Postal"
                  name="zipcode"
                  value={nuevoCliente.address.zipcode}
                  onChange={manejarCambioInput}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={agregarCliente} variant="contained" color="primary">
            Agregar Cliente
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notificación */}
      <Snackbar
        open={notificacionAbierta}
        autoHideDuration={4000}
        onClose={cerrarNotificacion}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={cerrarNotificacion}
          severity="success"
          sx={{ width: "100%" }}
        >
          {mensajeNotificacion}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ListaClientes;
