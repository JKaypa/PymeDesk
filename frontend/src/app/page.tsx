import { Resumen } from "@/common.types";
import getResumen from "@/utils/resumen";


export const metadata = {
  title: "PymeDesk | Inicio",
  description: "Resumen de métricas del Negocio",
};

export default async function Home() {
  const data: Resumen = await getResumen();
  return (
    <div className="w-full p-5 flex flex-col items-center gap-6">
      <h1 className=" text-3xl text-slate-700 font-bold">Resúmen de Metricas del Negocio</h1>
      <div className="grid grid-cols-[repeat(2,minmax(350px,1fr))] gap-10 text-center">
        <section className="bg-slate-500 h-28 flex flex-col justify-evenly rounded-lg border-t-8 border-yellow-300">
          <h2 className="text-2xl font-semibold">Total Pedidos</h2>
          <div className="text-xl">{data.total_pedidos}</div>
        </section>
        <section className="bg-slate-500 flex flex-col justify-evenly rounded-lg border-t-8 border-yellow-300">
          <h2 className="text-2xl font-semibold">Total Clientes</h2>
          <div className="text-xl">{data.total_clientes}</div>
        </section>
        <section className="bg-slate-500 h-28 flex flex-col justify-evenly rounded-lg border-t-8 border-yellow-300">
          <h2 className="text-2xl font-semibold">Ciudad con más Pedidos</h2>
          <div className="text-xl">{data.ciudad_con_mas_pedidos}</div>
        </section>
        <section className="bg-slate-500 flex flex-col justify-evenly rounded-lg border-t-8 border-yellow-300">
          <h2 className="text-2xl font-semibold">Producto más Vendido</h2>
          <div className="text-xl">{data.producto_mas_vendido}</div>
        </section>
        <section className="bg-slate-500 h-28 col-start-1 col-end-3 flex flex-col justify-evenly rounded-lg border-t-8 border-yellow-300">
          <h2 className="text-2xl font-semibold">Ingresos Totales</h2>
          <div className="text-xl">{data.total_ingresos}</div>
        </section>
      </div>
    </div>
  );
}
