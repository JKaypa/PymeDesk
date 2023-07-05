import { Clientes, NuevoCliente } from "@/common.types";
import { clientesUrl } from "./servicios";

export async function getClientes(search: string = "", page: string = "1") {
  if (search) {
    const res = await fetch(
      `${clientesUrl}?search=${search}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } else {
    const res = await fetch(
      `${clientesUrl}?page=${page}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  }
}

export async function getAllClientesId() {
  const response = await fetch(`${clientesUrl}`, {
    cache: "no-store",
  });
  const data: Clientes = await response.json();
  const count = Math.ceil(data.count / 5);
  const clientId: { id: string; nombre: string }[] = [];

  let page = 1;
  while (page <= count) {
    const res = await fetch(
      `${clientesUrl}?page=${page}`,
      { cache: "no-store" }
    );
    const data: Clientes = await res.json();
    const clientes = data.results;
    clientes.forEach((cliente) =>
      clientId.push({ id: cliente.id, nombre: cliente.nombre })
    );
    ++page;
  }

  return clientId;
}


export async function postClientes(data: NuevoCliente) {
  try {
    const res = await fetch(clientesUrl, {
      method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Failed to upload data') 
    
  } catch (error) {
    console.log('error', error); 
  }
}
