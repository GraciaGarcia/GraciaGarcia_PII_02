import { useState } from 'react';
import Formulario from './Formulario.jsx';
import ListaFichas from './ListaFichas.jsx';

function App() {
  const [tipo, setTipo] = useState('libro');         // Tipo de ficha seleccionada
  const [actualizar, setActualizar] = useState(false); // Controla la recarga de la lista

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Gestor de Fichas Bibliográficas</h1>

      {/* Selector de tipo de ficha */}
      <select
        className="mb-4 p-2 border rounded"
        onChange={e => setTipo(e.target.value)}
        value={tipo}
      >
        <option value="libro">Libro</option>
        <option value="video">Video</option>
        {/* Puedes agregar más opciones como artículo, podcast, etc. */}
      </select>

      {/* Formulario para agregar ficha */}
      <Formulario tipo={tipo} setActualizar={setActualizar} />

      <hr className="my-6" />

      {/* Lista de fichas filtradas por tipo */}
      <ListaFichas tipo={tipo} actualizar={actualizar} />
    </div>
  );
}

export default App;
