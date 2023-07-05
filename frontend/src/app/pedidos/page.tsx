import { Pedidos } from "@/common.types";
import EstadoSelect from "@/components/EstadoSelect";
import Paginated from "@/components/Paginated";
import Radio from "@/components/Radio";
import Search from "@/components/Search";
import {getPedidos} from "@/utils/pedidos";
import Link from "next/link";


export const metadata = {
  title: "PymeDesk | Pedidos",
  description: "Listado de pedidos",
};

export default async function Pedidos( {searchParams}: {searchParams: {search?: string , pagado?: string, page?: string}}) {

  const {search, pagado, page} = searchParams;
  
  const pedidos: Pedidos = await getPedidos(search, pagado, page);
  const count = pedidos.count
  

  return (
    <div className="w-full p-5 flex flex-col items-center gap-6">
      <h1 className=" text-3xl text-slate-700 font-bold">Pedidos</h1>
      <div className="w-3/4 flex justify-start gap-7">
      <div>
        <Search />
      </div>
      <div>
        <Radio />
      </div>
      </div>
      <table className="bg-slate-500 w-3/4 text-center rounded-lg">
        <thead>
          <tr className="h-12 text-lg rounded-lg border-t-8 border-yellow-300">
            <th>Estado</th>
            <th>Pagado</th>
            <th>Envío</th>
            <th>Cliente</th>
            <th>Productos</th>
            <th>Fecha</th>
            <th>Observaciones</th>
          </tr>
        </thead>
        <tbody className="h-10">
          {pedidos.results.map((pedido) => (
            <tr key={pedido.id} className="border-t-4 border-white h-10">
              <td>
              <EstadoSelect estado={pedido.estado} id={pedido.id} />
              </td>
              <td>{pedido.pagado ? 'Sí' : 'No'}</td>
              <td>{pedido.envio}</td>
              <td><Link href={`clientes?search=${pedido.cliente.nombre}`}>{pedido.cliente.nombre+'↗'}</Link></td>
              <td>{pedido.productos.map((producto) => producto.nombre).join(', ')}</td>
              <td>{pedido.timestamp.slice(0, 10)}</td>
              <td>{pedido.observaciones}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginated count={count}/>
    </div>
  );
}
