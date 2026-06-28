import "./css/styles.css";
import Header from "./components/layout/Header";
import Nav from "./components/layout/Nav";
import ListaClientes from "./views/ListaClientes";
import Footer from "./components/layout/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./views/Dashboard";
import DetalleCliente from "./views/DetalleCliente";
import Login from "./views/Login";

// Importar el Provider del contexto
import { AdminProvider } from "./context/AdminContext";

const App = () => {
  return (
    // Envolver toda la aplicación con AdminProvider
    <AdminProvider>
      <Router>
        <Header />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/inicio" />} />
            <Route path="/inicio" element={<Dashboard />} />
            <Route path="/clientes" element={<ListaClientes />} />
            <Route path="/clientes/:id" element={<DetalleCliente />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AdminProvider>
  );
};

export default App;
