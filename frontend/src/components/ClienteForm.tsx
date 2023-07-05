'use client'

import { crearCliente } from "@/app/actions/clientesActions";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function ClienteForm() {

  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [celular, setCelular] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [direccion, setDireccion] = useState('')

  const router = useRouter()
  

  const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    name === 'nombre' && setNombre(value)
    name === 'correo' && setCorreo(value)
    name === 'celular' && setCelular(value)
    name === 'ciudad' && setCiudad(value)
    name === 'direccion' && setDireccion(value)
    
  }


  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()
    formData.set('nombre', nombre)
    formData.set('correo', correo)
    formData.set('celular', celular)
    formData.set('ciudad', ciudad)
    formData.set('direccion', direccion)
    
    try {
      await crearCliente(formData)
    } catch (error) {
      return alert('Hubo un error')
    }

    alert('Cliente registrado en la base de datos satisfactoriamente!')

    setNombre('')
    setCorreo('')
    setCelular('')
    setCiudad('')
    setDireccion('')

    router.push('/clientes')
  }

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-4 w-1/2 mb-7">
        <div>
          <label className="text-slate-700">Nombre</label>
          <input type="text" name="nombre" value={nombre} onChange={handleForm} required className="pl-2 h-8 rounded-md w-full bg-slate-500" />
        </div>
        <div>
          <label className="text-slate-700 mr-2">Email</label>
          <input type="text" name="correo" value={correo} onChange={handleForm} required className="pl-2 h-8 rounded-md w-full bg-slate-500" />
        </div>
        <div>
          <label className="text-slate-700">Celular</label>
          <input type="text" name="celular" value={celular} onChange={handleForm} required className="pl-2 h-8 rounded-md w-full bg-slate-500" />
        </div>
        <div>
          <label className="text-slate-700">Ciudad</label>
          <input type="text" name="ciudad" value={ciudad} onChange={handleForm} required className="pl-2 h-8 rounded-md w-full bg-slate-500" />
        </div>
        <div>
          <label className="text-slate-700">Dirección</label>
          <input type="text" name="direccion" value={direccion} onChange={handleForm} required className="pl-2 h-8 rounded-md w-full bg-slate-500" />
        </div>
        <button type="submit" className="pl-2 h-10 rounded-md text-slate-700 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-400">Submit</button>
      </form>
  )
}
