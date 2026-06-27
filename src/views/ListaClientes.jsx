import React, { useEffect, useState } from 'react';
import {
    Container, // Contenedores
    Typography, // Para estilos de texto
    CircularProgress, // Para el estado de carga
    Alert, // Para mensajes de alerta
    Table, // Para la tabla
    TableBody, // Para el cuerpo de la tabla
    TableCell, // Para las celdas de la tabla
    TableContainer, // Para el contenedor de la tabla
    TableHead, // Para el encabezado de la tabla
    TableRow, // Para las filas de la tabla
    Paper, // Para dar efecto papel 
    TextField, // Para los campos de texto
    Box // Para contenedores flexibles
} from '@mui/material';

const ListaClientes = () => {

    const [clientes, setClientes] = useState([]);
    const [clientesFiltrados, setClientesFiltrados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');

    // Peticion a la API para obtener la lista de clientes
    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                setCargando(true);
                
                const respuesta = await fetch ('https://fakestoreapi.com/users');
                
                if(!respuesta.ok) {
                    throw new Error('Error HTTP: ${respuesta.status}');
                }

                const datos = await respuesta.json();

                setClientes(datos);
                setClientesFiltrados(datos);
                setError(null);

            } catch (error) {
                setError('No se pudo obtener la lista de clientes. Por favor, inténtelo de nuevo más tarde.');
                setClientes([]);
                setClientesFiltrados([]);
            } finally {
                setCargando(false);
            }
        };

        obtenerClientes();

    }, []);

    // Flitrar clientes según el término de búsqueda
    const manejarBusqueda = (evento) => {

        const texto = evento.target.value;
        setTerminoBusqueda(texto);

        if(texto.trim() === '') {
            setClientesFiltrados(clientes);
            return;
        };

        const busqueda = texto.toLowerCase();

        const resultados = clientes.filter((clientes) => {
            const nombreCompleto = `${clientes.name.firstname} ${clientes.name.lastname}`.toLowerCase();
            const ciudad = clientes.address.city.toLowerCase();
            return nombreCompleto.includes(busqueda) || ciudad.includes(busqueda);
        });

        setClientesFiltrados(resultados);

    };

    // Renderizado condicional
    if(cargando) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if(error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Título */}
            <Typography variant="h4" component="h1" gutterBottom>
                Lista de Clientes
            </Typography>

            {/* Buscador */}
            <Box sx={{ mb:3 }}>
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
                    {/* Encabezado de la tabla */}
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Nombre Completo</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Telefono</strong></TableCell>
                            <TableCell><strong>Ciudad</strong></TableCell>
                        </TableRow>
                    </TableHead>

                    {/* Cuerpo de la tabla*/}
                    <TableBody>
                        {clientesFiltrados.map((cliente) => (
                            <TableRow key={cliente.id}>
                                <TableCell>{cliente.id}</TableCell>
                                <TableCell>{cliente.name.firstname} {cliente.name.lastname}</TableCell>
                                <TableCell>{cliente.email}</TableCell>
                                <TableCell>{cliente.phone}</TableCell>
                                <TableCell>{cliente.address.city}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Mensaje cuando no hay resultados*/}
            {clientesFiltrados.length === 0 && (
                <Box sx={{ mt: 2}}>
                    <Alert severity="info">
                        No se encontraron clientes que coincidan con la busqueda.
                    </Alert>
                </Box>
            )}
        </Container>
    );
};

export default ListaClientes;