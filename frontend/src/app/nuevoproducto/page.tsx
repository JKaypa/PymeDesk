import ProductoForm from "@/components/ProductoForm";


export const metadata = {
  title: "PymeDesk | Nuevo Producto",
  description: "Registrar un nuevo producto",
};

export default async function NuevoProducto() {

  return (
    <div className="w-full px-5 flex flex-col items-center">
      <h1 className="text-center text-slate-700 text-3xl font-bold mt-2">Crear un vuevo producto</h1>
      <ProductoForm />
    </div>
  );
  
}
