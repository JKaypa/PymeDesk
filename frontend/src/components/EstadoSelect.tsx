"use client";

import { EditPedido } from "@/app/actions/pedidosActions";
import { useTransition } from "react";

export default function EstadoSelect({estado, id}: {estado: string, id: string}) {

  const [isPending, startTransition] = useTransition()
  
  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const formData = new FormData()
    formData.set('estado', value)
    formData.set('id', id)
    startTransition(() => EditPedido(formData))
    
  };

  return (
    <div>
      <select
        name="estado"
        value={estado}
        onChange={selectHandler}
        className="h-8 rounded-md bg-slate-500"
      >
        <option value="Pendiente">Pendiente</option>
        <option value="En ruta">En ruta</option>
        <option value="Entregado">Entregado</option>
        <option value="Cancelado">Cancelado</option>
      </select>
    </div>
  );
}
