import pytest
from ..models import Cliente, Producto, Pedido

@pytest.fixture
def cliente():
    payload = {
            'nombre': 'Pablo Mejía',
            'celular': '3027656098',
            'correo': 'pabm@gmail.com',
            'direccion': 'Av4 #55-01',
            'ciudad': 'Bogotá'
        }
    return payload

@pytest.fixture
def cliente_create():
    data = Cliente.objects.create(
            nombre = 'Pablo Mejía',
            celular = '3027656098',
            correo = 'pabm@gmail.com',
            direccion = 'Av4 #55-01',
            ciudad = 'Bogotá'
        )
    return data
    


@pytest.fixture
def producto_create():
    data = Producto.objects.create(
        nombre = 'PC',
        precio = 1000,
        cantidad = 45
    )
    return data


@pytest.fixture
def producto():
    payload = {
        'nombre': 'PC',
        'precio': 1000,
        'cantidad': 45
    }
    return payload


@pytest.fixture
def pedido(cliente_create, producto_create):
    payload = {
        'estado': 'pendiente',
        'pagado': False,
        'cliente': cliente_create.id,
        'productos': [producto_create.id],
        'envio': 'domicilio',
        'observaciones': 'Testing pedido'
    }
    return payload


@pytest.fixture
def pedido_create(cliente_create, producto_create):
    data = Pedido.objects.create(
        estado = 'pendiente',
        pagado = False,
        cliente = cliente_create,
        envio = 'domicilio',
        observaciones = 'Testing pedido'
    )
    data.productos.set([producto_create])
    return data