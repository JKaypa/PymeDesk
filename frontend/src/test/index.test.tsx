import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";



describe('Componente Form', () => {
  test("debe tener un enlace con el texto PymeDesk", () => {
    render(<NavBar />);
    expect(screen.getByText('PymeDesk')).toBeInTheDocument()
  })

  test("debe tener un enlace con el texto Inicio", () => {
    render(<NavBar />);
    expect(screen.getByText('Inicio')).toBeInTheDocument()
  })

  test("debe tener un enlace con el texto Pedidos", () => {
    render(<NavBar />);
    expect(screen.getByText('Pedidos')).toBeInTheDocument()
  })
  
  test("debe tener un enlace con el texto NuevoPedido", () => {
    render(<NavBar />);
    expect(screen.getByText('Nuevo Pedido')).toBeInTheDocument()
  })

  test("debe tener un enlace con el texto Clientes", () => {
    render(<NavBar />);
    expect(screen.getByText('Clientes')).toBeInTheDocument()
  })
  
  test("debe tener un enlace con el texto Nuevo Cliente", () => {
    render(<NavBar />);
    act(() => expect(screen.getByText('Nuevo Cliente')).toBeInTheDocument())
    
  })
})



describe("Componente Footer", () => {
  test("Debe renderizar texto", () => {
    render(<Footer />);
    expect(screen.getByText('PymeDesk')).toBeInTheDocument();
    expect(screen.getByText('© 2023 PymeDesk. All Rights Reserved.')).toBeInTheDocument();
  });

  
});
