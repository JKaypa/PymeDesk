"use server";

import { postPedidos } from "@/utils/pedidos";
import { updatePedidos } from "@/utils/pedidos";
import { revalidatePath } from "next/cache";

export async function crearPedido(formData: FormData) {
  const estado = formData.get("estado");
  const pagado = formData.get("pagado");
  const envio = formData.get("envio");
  const cliente = formData.get("cliente");
  const productosJson = formData.get("productos") as string;
  const observaciones = formData.get("observaciones");
  const productos = JSON.parse(productosJson);

  const nuevoPedido = {
    estado,
    pagado,
    envio,
    cliente,
    productos,
    observaciones,
  };
  await postPedidos(nuevoPedido);
  console.log(nuevoPedido);
}


export async function EditPedido(formData: FormData){
  const id = formData.get('id')
  const estado = formData.get("estado");
  
  const data = { estado }

  console.log(id, data);
  
  await updatePedidos(id, data)
  revalidatePath('/pedidos')

}

