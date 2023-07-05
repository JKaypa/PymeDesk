'use server'

import { postProducto } from "@/utils/productos";

export async function crearProducto(formData: FormData) {
  const nombre = formData.get("nombre");
  const precio = formData.get("precio");
  const cantidad = formData.get("cantidad");
  

  const nuevoProducto = {
    nombre,
    precio,
    cantidad
  };
  try {
    
    await postProducto(nuevoProducto);
  } catch (error) {
    console.log('Hubo un error', error);
    
  }
  
}