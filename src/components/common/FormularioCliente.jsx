import { useState } from "react";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";

const FormularioCliente = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    city: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: {
            firstname: formData.firstname,
            lastname: formData.lastname,
          },
          email: formData.email,
          phone: formData.phone,
          address: {
            city: formData.city,
          },
        }),
      });

      if (!response.ok) throw new Error("Error al dar de alta cliente");

      const data = await response.json();
      console.log("Cliente creado:", data);

      // Mostrar feedback visual
      setOpenSnackbar(true);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        city: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <TextField
        label="Nombre"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        required
      />
      <TextField
        label="Apellido"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextField
        label="Teléfono"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <TextField
        label="Ciudad"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
      />

      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "var(--violeta-medio)",
          "&:hover": { backgroundColor: "var(--violeta-oscuro)" },
        }}
      >
        Dar de Alta
      </Button>

      {/* Feedback visual */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Cliente creado exitosamente 🎉
        </Alert>
      </Snackbar>

      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};

export default FormularioCliente;
