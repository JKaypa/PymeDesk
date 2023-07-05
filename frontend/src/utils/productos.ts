import { NuevoProducto, Productos } from "@/common.types";
import { productosUrl } from "./servicios";

export async function getAllProductosId() {
  const response = await fetch(`${productosUrl}`, {cache: 'no-store'})
  const data: Productos = await response.json();
  const count = Math.ceil(data.count / 5)
  const productoId: {id: string, nombre: string}[] = []

  let page = 1
  while(page <= count){
    const res = await fetch(`${productosUrl}?page=${page}`, {cache: 'no-store'})
    const data : Productos = await res.json();
    const productos = data.results
    productos.forEach((producto) => productoId.push({id: producto.id, nombre: producto.nombre}))
    ++page
  }

  return productoId
}

export async function postProducto(data: NuevoProducto) {
  try {
    await fetch(productosUrl, {
      method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)
    })
    
  } catch (error) {
    console.log('error', error); 
  }
}