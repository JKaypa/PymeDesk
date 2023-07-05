import { Clientes } from "@/common.types";
import Paginated from "@/components/Paginated";
import Search from "@/components/Search";
import {getClientes} from "@/utils/clientes";
import Link from "next/link";



export const metadata = {
  title: "PymeDesk | Clientes",
  description: "Listado de clientes",
};

export default async function Clientes( {searchParams}: {searchParams: {search?: string, page?: string}}) {

  const {search, page} = searchParams;
  
  const clientes: Clientes = await getClientes(search, page);
  const count = clientes.count
  

  return (
    <div className="w-full p-5 flex flex-col items-center gap-6">
      <h1 className=" text-3xl text-slate-700 font-bold">Clientes</h1>
      <div className="w-3/5">
        <Search />
      </div>
      <table className="bg-slate-500 w-3/5 text-center rounded-lg">
        <thead>
          <tr className="h-12 text-lg rounded-lg border-t-8 border-yellow-300">
            <th>Nombres</th>
            <th>Email</th>
            <th>Celular</th>
            <th>Ciudad</th>
            <th>Dirección</th>
            <th>Pedidos</th>
          </tr>                                               
        </thead>
        <tbody className="h-10">
          {clientes.results.map((cliente) => (
            <tr key={cliente.id} className="border-t-4 border-white h-10">
              <td>{cliente.nombre}</td>
              <td>{cliente.correo}</td>
              <td>{cliente.celular}</td>
              <td>{cliente.ciudad}</td>
              <td>{cliente.direccion}</td>
              <td>{cliente.pedidos.map((ped, i) => <Link href={`pedidos?search=${ped}`} className="mr-2">{ped.slice(0,4) + '↗'}</Link>)}</td> 
            </tr>
          ))}
        </tbody>
      </table>
      <Paginated count={count}/>
    </div>
  );
}


