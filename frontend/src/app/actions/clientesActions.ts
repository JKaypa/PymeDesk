'use server'

import { postClientes } from "@/utils/clientes";

export async function crearCliente(formData: FormData) {
  const nombre = formData.get("nombre");
  const correo = formData.get("correo");
  const celular = formData.get("celular");
  const ciudad = formData.get("ciudad");
  const direccion = formData.get("direccion");
  

  const nuevoCliente = {
    nombre,
    correo,
    celular,
    ciudad,
    direccion
  };
  await postClientes(nuevoCliente);
  
}