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
import { AdminProvider, AdminContext } from "./context/AdminContext";
import { useContext } from "react";

// Importar el Provider del contexto
const AppContent = () => {
 const { admin } = useContext(AdminContext);

  return (
    // Envolver toda la aplicación con AdminProvider
      <Router>
        {admin ? (
          <>
        <Header />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/inicio" />} />
            <Route path="/inicio" element={<Dashboard />} />
            <Route path="/clientes" element={<ListaClientes />} />
            <Route path="/clientes/:id" element={<DetalleCliente />} />
          </Routes>
        </main>
        <Footer />
        </>
        ) : (
           <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        )}
      </Router>
      );
    };

        const App = () => {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
};

export default App;

