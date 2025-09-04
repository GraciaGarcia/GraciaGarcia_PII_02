import { useState } from "react";
import axios from "axios";

function Formulario({ tipo, setActualizar }) {
  const [formulario, setFormulario] = useState({});
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const validar = () => {
    if (tipo === "libro") {
      return (
        formulario.nombre_autor?.trim() &&
        formulario.apellido_autor?.trim() &&
        formulario.anio &&
        formulario.pagina
      );
    } else {
      return (
        formulario.nombre?.trim() &&
        formulario.tema?.trim() &&
        formulario.anio &&
        formulario.link?.trim()
      );
    }
  };

  const limpiarFormulario = () => {
    const inicial = tipo === "libro"
      ? { nombre_autor: "", apellido_autor: "", anio: "", pagina: "" }
      : { nombre: "", tema: "", anio: "", link: "" };
    setFormulario(inicial);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) {
      setMensaje("⚠️ Por favor completa todos los campos requeridos.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/fichas", {
        tipo,
        ...formulario,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      setMensaje("✅ Ficha guardada con éxito.");
      limpiarFormulario();
      setActualizar(prev => !prev); // Notifica al padre que debe actualizar la lista
    } catch (error) {
      setMensaje("❌ Error al guardar la ficha.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {tipo === "libro" ? (
        <>
          <input
            name="nombre_autor"
            placeholder="Nombre del autor"
            className="border p-2 w-full"
            value={formulario.nombre_autor || ""}
            onChange={handleChange}
          />
          <input
            name="apellido_autor"
            placeholder="Apellido del autor"
            className="border p-2 w-full"
            value={formulario.apellido_autor || ""}
            onChange={handleChange}
          />
          <input
            name="anio"
            placeholder="Año"
            type="number"
            className="border p-2 w-full"
            value={formulario.anio || ""}
            onChange={handleChange}
          />
          <input
            name="pagina"
            placeholder="Página"
            type="number"
            className="border p-2 w-full"
            value={formulario.pagina || ""}
            onChange={handleChange}
          />
        </>
      ) : (
        <>
          <input
            name="nombre"
            placeholder="Nombre del video"
            className="border p-2 w-full"
            value={formulario.nombre || ""}
            onChange={handleChange}
          />
          <input
            name="tema"
            placeholder="Tema"
            className="border p-2 w-full"
            value={formulario.tema || ""}
            onChange={handleChange}
          />
          <input
            name="anio"
            placeholder="Año"
            type="number"
            className="border p-2 w-full"
            value={formulario.anio || ""}
            onChange={handleChange}
          />
          <input
            name="link"
            placeholder="Link"
            className="border p-2 w-full"
            value={formulario.link || ""}
            onChange={handleChange}
          />
        </>
      )}

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Guardar ficha
      </button>

      {mensaje && (
        <p className={`mt-2 text-sm font-medium ${mensaje.includes("✅") ? "text-green-600" : "text-red-600"}`}>
          {mensaje}
        </p>
      )}
    </form>
  );
}

export default Formulario;
