import { useState, useEffect } from "react";
import axios from "axios";

function ListaFichas({ tipo, actualizar, onEditar }) {
  const [fichas, setFichas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    cargarFichas();
  }, [actualizar, tipo]);

  const cargarFichas = async () => {
    try {
      const res = await axios.get("http://localhost:5000/fichas");
      const filtradas = res.data.filter(f => f.tipo === tipo);
      setFichas(filtradas);
      setMensaje("");
    } catch (error) {
      setMensaje("❌ Error al cargar las fichas.");
    }
  };

  const eliminarFicha = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/fichas/${id}`);
      setMensaje("🗑️ Ficha eliminada.");
      setTimeout(() => setMensaje(""), 3000);
      cargarFichas();
    } catch (error) {
      setMensaje("❌ Error al eliminar la ficha.");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Fichas guardadas:</h2>
      {mensaje && (
        <p className={`text-sm mb-2 ${mensaje.includes("❌") ? "text-red-600" : "text-green-600"}`}>
          {mensaje}
        </p>
      )}
      <ul className="space-y-2">
        {fichas.map(f => (
          <li key={f.id} className="border p-3 rounded bg-gray-50 flex justify-between items-center">
            <div>
              <strong>{f.tipo.toUpperCase()}:</strong>{" "}
              {f.nombre || `${f.nombre_autor} ${f.apellido_autor}`} ({f.anio})
            </div>
            <div className="space-x-2">
              <button
                onClick={() => onEditar(f)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => eliminarFicha(f.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaFichas;
