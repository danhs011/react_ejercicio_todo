import { useState } from "react";
import "./App.css";
import Tarea from "./models/Tarea";

function App() {
  const [listaTareas, setListaTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState(Date.now);

  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
  };
  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleFechaChange = (e) => {
    setFecha(e.target.value);
  };

  const handleCrearClick = () => {
    setListaTareas([
      ...listaTareas,
      new Tarea(crypto.randomUUID(), titulo, descripcion, fecha, false),
    ]);
  };

  const handleCompletarChange = (id) => {
    setListaTareas(
      listaTareas.map((t) => {
        if (t.id === id) {
          t.completado = true;
          return t;
        }
        return t;
      })
    );
  };

  const handleEliminarClick = (id) => {
    setListaTareas(listaTareas.filter((t) => t.id !== id));
  };

  return (
    <>
      <div className="contenedor_header">
        <h1>CONTROL TAREAS</h1>
      </div>
      <div className="contenedor_inputs">
        <p>Titulo</p>
        <input type="text" onChange={handleTituloChange}></input>
        <p>Descipcion</p>
        <input type="text" onChange={handleDescripcionChange}></input>
        <p>Fecha limite</p>
        <input type="date" onChange={handleFechaChange}></input>
        <button onClick={handleCrearClick}>CREAR</button>
      </div>
      <div className="contenedor_listas">
        <ListaTares
          tareas={listaTareas}
          completar={handleCompletarChange}
          eliminar={handleEliminarClick}
          cabecera={"TAREAS PENDIENTES"}
          completadas={false}
        />
        <ListaTares
          tareas={listaTareas}
          completar={handleCompletarChange}
          eliminar={handleEliminarClick}
          cabecera={"TAREAS COMPELTADAS"}
          completadas={true}
        />
      </div>
    </>
  );
}

const ListaTares = ({ tareas, completar, eliminar, cabecera, completadas }) => {
  return (
    <div className="contenedor_lista">
      <h1>{cabecera}</h1>
      <div className="lista_tareas">
        {tareas.map((t) => {
          return t.completado === completadas ? (
            <TareaCard
              tarea={t}
              completar={() => completar(t.id)}
              eliminar={() => eliminar(t.id)}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

const TareaCard = ({ tarea, completar, eliminar }) => {
  return (
    <div className="tarea_card" key={tarea.id}>
      {!tarea.completado && (
        <div onChange={completar}>
          <input type="checkbox"></input>
        </div>
      )}
      <div className="tarea_card_info">
        <p>{tarea.titulo}</p>
        <p>{tarea.descripcion}</p>
        <p>Quedan {tarea.diasRestantes} dias</p>
      </div>
      <div>
        <button onClick={eliminar}>Eliminar</button>
      </div>
    </div>
  );
};

export default App;
