"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Paginated({ count }: { count: number }) {
  const totalPages = Math.ceil(count / 5);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const handlePage = (page: number) => {
    setCurrentPage(page);
    router.push(`?page=${page}`);
  };

  const pageButtons = () => {
    const buttons = [];
    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePage(page)}
          disabled={page === currentPage}
          className={`p-2 mr-2 rounded-md ${
            page === currentPage
              ? "bg-yellow-300"
              : "hover:bg-cyan-500 bg-slate-400"
          }`}
        >
          {page}
        </button>
      );
    }
    return buttons;
  };

  return <div>{pageButtons()}</div>;
}
