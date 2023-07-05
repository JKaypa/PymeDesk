import { resumenUrl } from "./servicios";


export default async function getResumen() {
  const res = await fetch(resumenUrl, {cache: 'no-store'});

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
  
}