export interface Resumen {
  total_pedidos: number;
  total_clientes: number;
  ciudad_con_mas_pedidos: string;
  producto_mas_vendido: string;
  total_ingresos: string;
}


export interface Pedidos {
  count: number;
  results: Pedido[]
}


export interface Pedido {
  id: string;
  estado: string;
  pagado: boolean;
  cliente: Cliente;
  productos: Producto[];
  envio: string;
  observaciones: string;
  timestamp: string
}


export interface NuevoPedido {
  estado: FormDataEntryValue | null;
  pagado: FormDataEntryValue | null;
  cliente: FormDataEntryValue | null;
  productos: FormDataEntryValue[] | null;
  envio: FormDataEntryValue | null;
  observaciones: FormDataEntryValue | null
}


export interface Clientes {
  count: number;
  results: Cliente[]
}


export interface Cliente {
  id: string;
  nombre: string;
  celular: string;
  correo: string;
  direccion: string;
  ciudad: string;
  pedidos: string[];
}


export interface NuevoCliente {
  nombre: FormDataEntryValue | null;
  correo: FormDataEntryValue | null;
  celular: FormDataEntryValue | null;
  ciudad: FormDataEntryValue | null;
  direccion: FormDataEntryValue | null;
}


export interface Productos {
  count: number;
  results: Producto[]
}


export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
}


export interface NuevoProducto {
  nombre: FormDataEntryValue | null;
  precio: FormDataEntryValue | null;
  cantidad: FormDataEntryValue | null;
}


export interface ClienteId {
  id: string;
  nombre: string
}


export interface ProductosId {
  id: string;
  nombre: string
}