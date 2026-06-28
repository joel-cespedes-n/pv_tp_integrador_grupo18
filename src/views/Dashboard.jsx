import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Dashboard = () => {
  return (
    <Container className="dashboard-container">
      {/* Texto de presentación */}
      <Card className="dashboard-intro-card">
        <CardContent>
          <Typography variant="h4" className="dashboard-title">
            Bienvenido al Panel de Gestión
          </Typography>

          <Typography variant="body1" className="dashboard-text">
            ¡Bienvenido a la <strong>Plataforma de Gestión de Clientes</strong>!
            Este espacio fue diseñado para ayudarte a organizar y dar
            seguimiento a tus actividades de manera eficiente.
          </Typography>

          <Typography variant="body1" className="dashboard-text">
            Desde la sección <strong>Inicio</strong> podrás visualizar métricas
            generales de la plataforma, como visitas a la página, clientes
            registrados y nuevos clientes. Esto te permitirá tener una visión
            rápida del estado actual de tu gestión.
          </Typography>

          <Typography variant="body1" className="dashboard-text">
            En la sección <strong>Clientes</strong> tendrás la posibilidad de
            registrar nuevos clientes, consultar la información de los ya
            existentes y mantener sus datos actualizados de forma ordenada y
            segura.
          </Typography>

          <Typography variant="body1" className="dashboard-text">
            Además, el encabezado te muestra tu perfil de administrador y te
            ofrece la opción de cerrar sesión de manera rápida y confiable,
            garantizando la seguridad de tu información.
          </Typography>

          <Typography variant="body1" className="dashboard-text">
            Explora cada apartado para potenciar tu aprendizaje, fortalecer la
            colaboración con tu equipo y desarrollar habilidades de gestión
            útiles tanto en tu vida académica como profesional.
          </Typography>
        </CardContent>
      </Card>

      {/* Métricas */}
      <div className="dashboard-metrics">
        <Card className="dashboard-metric-card">
          <CardContent>
            <Typography variant="h6" className="dashboard-metric-title">
              Visitas a la Página
            </Typography>
            <Typography variant="h4" className="dashboard-metric-value">
              1,245
            </Typography>
          </CardContent>
        </Card>

        <Card className="dashboard-metric-card">
          <CardContent>
            <Typography variant="h6" className="dashboard-metric-title">
              Clientes Registrados
            </Typography>
            <Typography variant="h4" className="dashboard-metric-value">
              320
            </Typography>
          </CardContent>
        </Card>

        <Card className="dashboard-metric-card">
          <CardContent>
            <Typography variant="h6" className="dashboard-metric-title">
              Nuevos Clientes
            </Typography>
            <Typography variant="h4" className="dashboard-metric-value">
              15
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Dashboard;
