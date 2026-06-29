import { AdminProvider } from "./context/AdminContext"; 
import Login from "./views/Login"; 
import Header from "./components/Header"; 
import './App.css';

function App() {
  return (
    <>
    <AdminProvider>
      <Header />
      <Login />
    </AdminProvider>
      <section id="center">
        <div className="hero">

           <h1>Bienvenido al Integrador</h1>
          <p>Este bloque lo podés usar para mostrar un banner o mensaje inicial.</p>
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Próximos pasos</h2>
          <p>Aquí podés agregar contenido propio del integrador.</p>
          <ul>
            <li>Configurar rutas con React Router</li>
            <li>Agregar Header con datos del admin</li>
            <li>Implementar cierre de sesión</li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Conexiones</h2>
          <p>Podés usar este bloque para links internos de tu proyecto.</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                Repositorio del integrador
              </a>
            </li>
            <li>
              <a href="#">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
               Grupo de trabajo
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
