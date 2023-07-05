"use client";

import { usePathname, useRouter } from "next/navigation";

export default function Radio() {

  const router = useRouter()
  const pathname = usePathname()
  
  const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value      
    value ? router.push(`?pagado=${value}`) : router.replace(pathname)

  }

  return (
    <div>
      <p className="text-slate-700">Pagado</p>
      <div className="flex gap-5">
      <div>
        <label htmlFor="si" className="mr-1 text-gray-700">Sí</label>
        <input type="radio" id="si" value="true" name="pagado" onChange={handleRadio} />
      </div>
      <div>
        <label htmlFor="no" className="mr-1 text-gray-700">No</label>
        <input type="radio" id="no" value="false" name="pagado" onChange={handleRadio} />
      </div>
      <div>
        <label htmlFor="todos" className="mr-1 text-gray-700">Todos</label>
        <input type="radio" id="todos" value="" name="pagado" onChange={handleRadio} defaultChecked={true} />
      </div>
      </div>
    </div>
  );
}
