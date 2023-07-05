'use client'

import { crearProducto } from "@/app/actions/productoAction";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function ProductoForm() {

  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [cantidad, setCantidad] = useState('')


  const router = useRouter()
  

  const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    name === 'nombre' && setNombre(value)
    name === 'precio' && setPrecio(value)
    name === 'cantidad' && setCantidad(value)
    
  }


  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()
    formData.set('nombre', nombre)
    formData.set('precio', precio)
    formData.set('cantidad', cantidad)
    
    try {
      await crearProducto(formData)
    } catch (error) {
      return alert('Hubo un error')
    }

    alert('Producto registrado en la base de datos satisfactoriamente!')

    setNombre('')
    setPrecio('')
    setCantidad('')

    router.push('/pedidos')
  }

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-4 w-1/2 mb-7">
        <div>
          <label htmlFor="nombre|" className="text-slate-700">Nombre</label>
          <input type="text" name="nombre" id="nombre" value={nombre} onChange={handleForm} required className="pl-2 h-8 rounded-md w-full bg-slate-500" />
        </div>
        <div>
          <label htmlFor="precio" className="text-slate-700 mr-2">Precio</label>
          <input type="number" name="precio" id="precio" value={precio} onChange={handleForm} min={5} required className="pl-2 h-8 rounded-md w-full bg-slate-500" />
        </div>
        <div>
          <label htmlFor="cantidad" className="text-slate-700">Cantidad</label>
          <input type="number" name="cantidad" id="cantidad" value={cantidad} onChange={handleForm} min={1} required className="pl-2 h-8 rounded-md w-full bg-slate-500" />
        </div>
        <button type="submit" className="pl-2 h-10 rounded-md text-slate-700 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-400">Submit</button>
      </form>
  )
}
