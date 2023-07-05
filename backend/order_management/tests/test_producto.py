import pytest
from ..models import Producto
from rest_framework import status
from rest_framework.test import APIClient

client = APIClient()

@pytest.mark.django_db
def test_get_producto(producto_create):
    producto_create
    url = '/api/productos/'
    response = client.get(url)
    response_data = response.json()
    results = response_data['results']
    assert response.status_code == status.HTTP_200_OK
    assert len(results) > 0


@pytest.mark.django_db
def test_create_producto(producto):
    url = '/api/productos/'
    response = client.post(url, producto)
    data = response.data
    assert response.status_code == status.HTTP_201_CREATED
    id = data['id']
    assert isinstance(id, str)
    assert data['nombre'] == producto['nombre']
    assert data['precio'] == producto['precio']
    assert data['cantidad'] == producto['cantidad']


@pytest.mark.django_db
def test_update_producto(producto_create):
    url = f'/api/productos/{producto_create.id}/'

    payload = {
          'cantidad': 47
        }     
    
    response = client.patch(url, payload) 
    
    data = response.data
    assert response.status_code == status.HTTP_200_OK
    assert data['cantidad'] == 47


@pytest.mark.django_db
def test_delete_producto(producto_create):
    url = f'/api/productos/{producto_create.id}/'     
    
    response = client.delete(url) 
    
    assert response.status_code == status.HTTP_204_NO_CONTENT
    with pytest.raises(Producto.DoesNotExist):
          producto_create.refresh_from_db()
