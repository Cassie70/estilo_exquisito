import { useState } from "react";
import { Buscador } from "./components/Buscador";
import { Crear } from "./components/Crear";
import { Listado } from "./components/Listado";

function App() {

  const [listadoState, setListadoState] = useState([]);

  return (

    <div className="layout">
      {/*Cabecera*/}
      <div className="header-principal">
        <header className="header">
          <h1>Estilo Exquisito</h1>
        </header>

        {/*Barra de navegacion*/}
        <nav className="nav">
          <ul>
            <li><a href="/#">Inicio</a></li>
            <li><a href="/#">Almacen</a></li>
            <li><a href="/#">Ventas</a></li>
            <li><a href="/#">Reportes</a></li>
          </ul>
        </nav>
      </div>

      {/*Contenido Principal*/}
      
        <section className="content">
          {/*Aqui va el listado de las peliculas*/}
          <Listado listadoState={listadoState} setListadoState={setListadoState} />
        </section>

        {/*Barra Lateral*/}
        <aside className="lateral">
          <Buscador listadoState={listadoState} setListadoState={setListadoState} />
          <Crear setListadoState={setListadoState} />
        </aside>
      

      {/*Pie de pagina*/}
      <footer className="footer">
        &copy; Todos los derechos de esta web a - <a href="https://www.youtube.com/@AChains">AChains</a>
      </footer>

    </div>

  );
}

export default App;
