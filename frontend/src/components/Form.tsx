'use client'

import { crearPedido } from "@/app/actions/pedidosActions"
import { ClienteId, ProductosId } from "@/common.types";
import { getAllClientesId } from "@/utils/clientes";
import { getAllProductosId } from "@/utils/productos";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function Form() {

  const [clientesId, setClientesId] = useState<ClienteId[]>([])
  const [productosId, setProductosId] = useState<ProductosId[]>([])
  const [estado, setEstado] = useState('Pendiente')
  const [pagado, setPagado] = useState('false')
  const [envio, setEnvio] = useState('Domicilio')
  const [cliente, setCliente] = useState('')
  const [productos, setProductos] = useState<string[]>([])
  const [observaciones, setObservaciones] = useState('')

  const router = useRouter()

  useEffect(() => {
    (async function setValues () {
      const clientes = await getAllClientesId()
      const productos = await getAllProductosId()
      setClientesId(clientes)
      setProductosId(productos)
    })()    

  }, [])
  

  const optionHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name
    const value = event.target.value
    const options = Array.from(event.target.selectedOptions, (option) => option.value)
    name === 'estado' && setEstado(value)
    name === 'pagado' && setPagado(value)
    name === 'envio' && setEnvio(value)
    name === 'cliente' && setCliente(value)
    name === 'productos' && setProductos(options)
    
  }


  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()
    formData.set('estado', estado)
    formData.set('pagado', pagado)
    formData.set('envio', envio)
    formData.set('cliente', cliente)
    formData.append('productos', JSON.stringify(productos))
    formData.set('observaciones', observaciones)
    
    try {
      await crearPedido(formData)
    } catch (error) {
      return alert('Hubo un error')
    }

    alert('Pedido creado satisfactoriamente!')

    setEstado('Pendiente')
    setPagado('false')
    setEnvio('Domicilio')
    setCliente('')
    setProductos([])
    setObservaciones('')

    router.push('/pedidos')
  }

 
  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-4 w-1/2 mb-7">
        <div>
          <label htmlFor="estado" className="text-slate-700">Estado</label>
          <select name="estado" id="estado" onChange={optionHandler} value={estado} className="pl-2 h-8 rounded-md w-full bg-slate-500">
            <option value="Pendiente">Pendiente</option>
            <option value="En ruta">En ruta</option>
            <option value="Entregado">Entregado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
        <div>
          <label htmlFor="pagado" className="text-slate-700 mr-2">Pagado</label>
          <select name="pagado" id="pagado" value={pagado} onChange={optionHandler} className="pl-2 h-8 rounded-md w-full bg-slate-500" >
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label htmlFor="envio" className="text-slate-700">Envio</label>
          <select name="envio" id="envio" value={envio} onChange={optionHandler} className="pl-2 h-8 rounded-md w-full bg-slate-500">
            <option value="Domicilio">Domicilio</option>
            <option value="Recoge en punto">Recoge en punto</option>
          </select>
        </div>
        <div>
          <label htmlFor="cliente" className="text-slate-700">Cliente</label>
          <select name="cliente" id="cliente" value={cliente} onChange={optionHandler} required className="pl-2 h-8 rounded-md w-full bg-slate-500">
          <option value="">-- Seleccione un cliente --</option>
            {clientesId.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="productos" className="text-slate-700">Productos (Presione tecla Ctrl para selección multiple)</label>
          <select
            name="productos"
            id="productos"
            value={productos}
            onChange={optionHandler}
            multiple
            required
            className="p-2 h-21 rounded-md w-full bg-slate-500"
          >
            {productosId.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="observaciones" className="tetext-slate-700">Observaciones</label>
          <textarea
            name="observaciones"
            id="observaciones"
            cols={10}
            rows={5}
            placeholder="Escribe una observación..."
            value={observaciones}
            onChange={e => setObservaciones(e.target.value)}
            className="p-2 rounded-md w-full bg-slate-500"
          />
        </div>
        <button type="submit" className="pl-2 h-10 rounded-md text-slate-700 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-400">Submit</button>
      </form>
  )
}
