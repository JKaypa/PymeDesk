import pytest
from rest_framework import status
from rest_framework.test import APIClient
from ..models import Cliente


client = APIClient()


@pytest.mark.django_db
def test_get_cliente(cliente_create):
        cliente_create
        url = '/api/clientes/'
        response = client.get(url)
        response_data = response.json()
        results = response_data['results']
        assert response.status_code == status.HTTP_200_OK
        assert len(results) == 1


@pytest.mark.django_db   
def test_create_cliente(cliente):
        url = '/api/clientes/'
        response = client.post(url, cliente)
        data = response.data
        id = data['id']
        assert response.status_code == status.HTTP_201_CREATED
        assert isinstance(id, str)
        assert data['nombre'] == cliente['nombre']
        assert data['correo'] == cliente['correo']
        assert data['celular'] == cliente['celular']
        assert data['ciudad'] == cliente['ciudad']
     

@pytest.mark.django_db
def test_update_cliente(cliente_create):
    url = f'/api/clientes/{cliente_create.id}/'

    payload = {
            'nombre': 'Pepe',
            'correo': 'pepe@gmail.com',
            'ciudad': 'Monteria'
        }     
    
    response = client.patch(url, payload) 
    
    data = response.data
    assert response.status_code == status.HTTP_200_OK
    assert data['nombre'] == 'Pepe'
    assert data['correo'] == 'pepe@gmail.com'
    assert data['ciudad'] == 'Monteria'


@pytest.mark.django_db
def test_delete_cliente(cliente_create):
    url = f'/api/clientes/{cliente_create.id}/'     
    
    response = client.delete(url) 
    
    assert response.status_code == status.HTTP_204_NO_CONTENT
    with pytest.raises(Cliente.DoesNotExist):
          cliente_create.refresh_from_db()