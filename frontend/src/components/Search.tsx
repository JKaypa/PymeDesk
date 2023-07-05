"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";


export default function Search() {
  const pathname = usePathname();
  const [search, setSearch] = useState<string>();
  const router = useRouter();
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    value === "" ? router.replace(pathname) : setSearch(value);
  }

  const handleKeyBoard = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === "Enter" && router.push(`?search=${search}`);
  }

  return (
    <div className="w-full flex gap-5">
      <div className="flex flex-col">
        <label htmlFor="buscar" className="text-slate-700">
          Buscar
        </label>
        <input
          onChange={handleChange}
          onKeyDown={handleKeyBoard}
          type="text"
          value={search}
          name="buscar"
          className="pl-2 rounded-lg bg-gray-400"
        />
      </div>
    </div>
  );
}
