// components/OnibusItem.tsx
import React from "react";

interface OnibusProps {
  linha: string;
  descricao: string;
  ocupacao: string;
  cor: string;
  className?: string; 
}

export function OnibusItem({ linha, descricao, ocupacao, cor }: OnibusProps) {
  const corBorda = `border-${cor}-400`;
  const corFundo = `bg-${cor}-500`;

  return (
    <div
      className={`flex justify-between items-center p-4 rounded-xl shadow-sm border-l-4 ${corBorda} bg-white`}
      title={`Ônibus ${linha}: ${descricao}, Ocupação: ${ocupacao}`}
    >
      <div>
        <span className={`text-white ${corFundo} px-2 py-1 text-sm rounded`}>
          {linha}
        </span>
        <p className="text-sm text-gray-700 mt-1">{descricao}</p>
      </div>
      <span className="text-sm text-gray-800">{ocupacao}</span>
    </div>
  );
}
