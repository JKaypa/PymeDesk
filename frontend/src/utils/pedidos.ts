import { NuevoPedido } from "@/common.types";
import { crearPedidoUrl, getPedidoUrl } from "./servicios";

export async function getPedidos(
  search: string = "",
  pagado: string = "",
  page: string = ""
) {
  if (search) {
    const res = await fetch(`${getPedidoUrl}?search=${search}`, { cache: "no-store" });

    if (!res.ok) throw new Error("Algo falló");
    return res.json();

  } else if (pagado) {
    const res = await fetch(`${getPedidoUrl}?pagado=${pagado}`, { cache: "no-store" });

    if (!res.ok) throw new Error("Algo falló");
    return res.json();

  } else if (page) {
    const res = await fetch(`${getPedidoUrl}?page=${page}`,{ cache: "no-store" });

    if (!res.ok) throw new Error("Algo falló");
    return res.json();

  } else {
    const res = await fetch(`${getPedidoUrl}`, {cache: "no-store",});
    if (!res.ok) throw new Error("Algo falló");
    return res.json();
  }
}


export async function detallePedido(id: string) {
  const res = await fetch(`${getPedidoUrl}${id}/`, { cache: "no-store",});

  if (!res.ok) throw new Error("Algo falló");
  return res.json();
}


export async function postPedidos(data: NuevoPedido) {
  try {
    const res = await fetch(crearPedidoUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Algo falló')
  } catch (error) {
    console.log("error", error);
  }
}


export async function updatePedidos(
  id: FormDataEntryValue | null,
  data: { estado: FormDataEntryValue | null }
) {
  try {
    const res = await fetch(`${crearPedidoUrl}${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if(!res.ok) throw new Error('Algo falló')
  } catch (error) {
    console.log("error", error);
  }
}
