import ClienteForm from "@/components/ClienteForm";


export const metadata = {
  title: "PymeDesk | Nuevo Cliente",
  description: "Registrar un nuevo cliente",
};

export default async function NuevoCliente() {

  return (
    <div className="w-full px-5 flex flex-col items-center">
      <h1 className="text-center text-slate-700 text-3xl font-bold mt-2">Registrar un nuevo Cliente</h1>
      <ClienteForm />
    </div>
  );
  
}
