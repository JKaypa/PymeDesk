import Link from "next/link";

export default function NavBar() {
 
  return (
    <nav className="px-6 w-full h-20 bg-cyan-400 flex items-center justify-between">
      <div className="font-bold text-3xl">
        <Link href='/'>PymeDesk</Link>
      </div>
      <div className="flex gap-7 font-medium">
        <Link href='/'>Inicio</Link>
        <Link href='pedidos'>Pedidos</Link>
        <Link href='nuevopedido'>Nuevo Pedido</Link>
        <Link href='clientes'>Clientes</Link>
        <Link href='nuevocliente'>Nuevo Cliente</Link>
        <Link href='nuevoproducto'>Nuevo Producto</Link>
      </div>
    </nav>
  );
}


