import Form from "@/components/Form";

export const metadata = {
  title: "PymeDesk | Nuevo Pedido",
  description: "Crear un nuevo pedido",
};

export default async function NuevoPedido() {

  return (
    <div className="w-full px-5 flex flex-col items-center">
      <h1 className="text-center text-slate-700 text-3xl font-bold mt-2">Crear un nuevo Pedido</h1>
      <Form />
    </div>
  );
  
}
