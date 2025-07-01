import React from "react";

interface ParadaProps {
  nome: string;
  ocupacao: string;
  alerta?: string;
  className?: string; 
}

export function ParadaItem({ nome, ocupacao, alerta, className }: ParadaProps) {
  const borderColor = alerta ? "border-red-400" : "border-yellow-400";

  return (
    <div
      className={`flex justify-between items-center p-4 rounded-xl shadow-sm border-l-4 ${borderColor} bg-white ${className}`}
      title={`Parada: ${nome}, Ocupação: ${ocupacao}`}
    >
      <div>
        <p className="text-sm text-gray-700">{nome}</p>
        {alerta && <p className="text-xs text-red-500 mt-1">{alerta}</p>}
      </div>
      <span className="text-sm text-gray-800">{ocupacao}</span>
    </div>
  );
}