import React from "react";

// Tailwind só gera classes que aparecem literalmente no código, por isso
// as cores são mapeadas aqui em vez de montadas com template string.
const CORES = {
  red: { borda: "border-red-400", fundo: "bg-red-500" },
  blue: { borda: "border-blue-400", fundo: "bg-blue-500" },
  green: { borda: "border-green-400", fundo: "bg-green-500" },
} as const;

export type CorOnibus = keyof typeof CORES;

interface OnibusProps {
  linha: string;
  descricao: string;
  ocupacao: string;
  cor: CorOnibus;
  className?: string;
}

export function OnibusItem({ linha, descricao, ocupacao, cor, className = "" }: OnibusProps) {
  const { borda, fundo } = CORES[cor] ?? CORES.blue;

  return (
    <div
      className={`flex justify-between items-center p-4 rounded-xl shadow-sm border-l-4 ${borda} bg-white ${className}`}
      title={`Ônibus ${linha}: ${descricao}, Ocupação: ${ocupacao}`}
    >
      <div>
        <span className={`text-white ${fundo} px-2 py-1 text-sm rounded`}>{linha}</span>
        <p className="text-sm text-gray-700 mt-1">{descricao}</p>
      </div>
      <span className="text-sm text-gray-800">{ocupacao}</span>
    </div>
  );
}
