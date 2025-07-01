/* Arquivo: app/page.tsx */
"use client";
import React, { useState } from "react";
import { ParadaItem } from "@/components/ParadaItem";
import { OnibusItem } from "@/components/OnibusItem";

const paradas = [
  {
    nome: "Av Silves, 05",
    ocupacao: "04 / 12",
  },
  {
    nome: "Darcy Vargas, 02",
    ocupacao: "01 / 12",
    alerta: "A parada está quase vazia, tome cuidado",
  },
];

const onibus = [
  {
    linha: "671",
    descricao: "T2 / Centro / Cachoeirinha",
    ocupacao: "22 / 35",
    cor: "red",
  },
  {
    linha: "550",
    descricao: "T4 / Chapada / Torquatro",
    ocupacao: "07 / 35",
    cor: "blue",
  },
];

function App() {
  const [abaAtiva, setAbaAtiva] = useState("parada");
  const [busca, setBusca] = useState("");

  const paradasFiltradas = paradas.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const onibusFiltrados = onibus.filter((o) =>
    o.linha.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      {/* Lado esquerdo */}
      <aside className="w-[600px] bg-white shadow-lg p-6 flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-purple-600 text-center">
          BusFlow
        </h1>

        {/* Tabs */}
        <div className="bg-purple-100 p-1 rounded-full flex gap-1 w-fit mx-auto shadow-sm">
          <button
            onClick={() => setAbaAtiva("parada")}
            aria-label="Ver paradas"
            className={`flex-1 px-4 py-1 rounded-full ${
              abaAtiva === "parada"
                ? "bg-purple-600 text-white shadow-md"
                : "text-purple-600"
            }`}
          >
            Parada
          </button>
          <button
            onClick={() => setAbaAtiva("onibus")}
            aria-label="Ver ônibus"
            className={`flex-1 px-4 py-1 rounded-full ${
              abaAtiva === "onibus"
                ? "bg-purple-600 text-white shadow-md"
                : "text-purple-600"
            }`}
          >
            Ônibus
          </button>
        </div>

        {/* Campo de busca */}
        <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 w-72 focus-within:ring-2 focus-within:ring-purple-300 bg-white shadow-sm mx-auto">
          <input
            type="text"
            placeholder={`Pesquise por um ${
              abaAtiva === "parada" ? "parada" : "ônibus"
            }`}
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="flex-1 outline-none bg-transparent text-sm text-gray-700"
            aria-label="Campo de busca"
          />
          <svg
            style={{ width: "16px", height: "16px" }}
            className="text-gray-500 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Lista */}
        <div className="flex flex-col gap-4">
          {abaAtiva === "parada"
            ? paradasFiltradas.map((p, idx) => (
                <ParadaItem
                  key={idx}
                  nome={p.nome}
                  ocupacao={p.ocupacao}
                  alerta={p.alerta}
                  className="bg-gray-100 border-l-4 border-green-500 p-4 rounded-lg shadow-sm"
                />
              ))
            : onibusFiltrados.map((o, idx) => (
                <OnibusItem
                  key={idx}
                  linha={o.linha}
                  descricao={o.descricao}
                  ocupacao={o.ocupacao}
                  cor={o.cor}
                  className="bg-gray-100 border-l-4 border-blue-500 p-4 rounded-lg shadow-sm"
                />
              ))}
        </div>
      </aside>

      {/* Lado direito */}
      <main className="flex-1 bg-gray-50 flex items-center justify-center">
        {abaAtiva === "parada" ? (
          <div className="w-full h-full p-6">
            <iframe
              title="mapa"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-60.1125%2C-3.202%2C-59.888%2C-2.992&layer=mapnik"
              className="w-full h-full rounded-lg border"
            />
          </div>
        ) : (
          <div className="text-gray-400 text-lg">
            Selecione um ônibus para ver detalhes
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
