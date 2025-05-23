import React, { useState } from "react";
import resultadosData from "../utils/resultados";

const Resultados = () => {
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [equipoFiltro, setEquipoFiltro] = useState("");
  const [estadioFiltro, setEstadioFiltro] = useState("");

  const obtenerFechaNormalizada = (diaTexto) => {
    const partes = diaTexto.toLowerCase().split(" ");
    const dia = parseInt(partes[1], 10);
    const mesTexto = partes.find((parte) =>
      [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ].includes(parte)
    );

    const meses = {
      enero: "01",
      febrero: "02",
      marzo: "03",
      abril: "04",
      mayo: "05",
      junio: "06",
      julio: "07",
      agosto: "08",
      septiembre: "09",
      octubre: "10",
      noviembre: "11",
      diciembre: "12",
    };

    const mes = meses[mesTexto];
    const diaFormateado = dia < 10 ? `0${dia}` : `${dia}`;

    return `2025-${mes}-${diaFormateado}`;
  };

  const estadiosUnicos = [...new Set(resultadosData.map((p) => p.estadio))];

  const partidosFiltrados = resultadosData.filter((partido) => {
    const fechaNormalizada = obtenerFechaNormalizada(partido.dia);
    const coincideFecha = fechaFiltro ? fechaNormalizada === fechaFiltro : true;
    const coincideEquipo = equipoFiltro
      ? partido.equipos.toLowerCase().includes(equipoFiltro.toLowerCase())
      : true;
    const coincideEstadio = estadioFiltro
      ? partido.estadio === estadioFiltro
      : true;
    return coincideFecha && coincideEquipo && coincideEstadio;
  });

  const enJuego = partidosFiltrados.filter((p) => p.estado === "jugando");
  const finalizados = partidosFiltrados.filter((p) => p.estado !== "jugando");

  return (
    <main className="flex justify-center items-center">
      <div className="bg-white/90 backdrop-blur-lg p-6 rounded-xl shadow-lg max-w-7xl w-full">
        <h2 className="text-green-700 text-2xl font-semibold mb-6 text-center">
          Resultados de Partidos
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-4 justify-center">
          <input
            type="date"
            value={fechaFiltro}
            onChange={(e) => setFechaFiltro(e.target.value)}
            className="border px-3 py-2 rounded w-full md:w-1/3 lg:hidden"
          />
          <input
            type="text"
            placeholder="Filtrar por equipo (Ej. México)"
            value={equipoFiltro}
            onChange={(e) => setEquipoFiltro(e.target.value)}
            className="border px-3 py-2 rounded w-full md:w-1/3"
          />
          <select
            value={estadioFiltro}
            onChange={(e) => setEstadioFiltro(e.target.value)}
            className="border px-3 py-2 rounded w-full md:w-1/3"
          >
            <option value="">Todos los campos</option>
            {estadiosUnicos.map((estadio, idx) => (
              <option key={idx} value={estadio}>
                {estadio}
              </option>
            ))}
          </select>
        </div>

        {finalizados.length === 0 ? (
          <p className="text-center text-gray-500">
            No hay resultados disponibles.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {finalizados.map((partido, index) => (
              <div
                key={index}
                className="border rounded-xl shadow-xl p-6 bg-white text-center"
              >
                <p className="text-md text-gray-500 font-medium mb-1">
                  {partido.dia}
                </p>
                <h3 className="text-xl font-bold text-green-700 mb-2">
                  {partido.equipos}
                </h3>
                <p className="text-gray-700">⏰ {partido.hora}</p>
                <p className="text-gray-700">📍 {partido.estadio}</p>
                {partido.resultado && (
                  <p className="text-black font-semibold mt-2">
                    Resultado: {partido.resultado}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Resultados;
