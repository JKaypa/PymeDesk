import pytest
from ..models import Pedido
from rest_framework import status
from rest_framework.test import APIClient

client = APIClient()


@pytest.mark.django_db
def test_get_pedido(pedido_create):
    pedido_create
    url = '/api/obtenerpedidos/'
    response = client.get(url)
    response_data = response.json()
    results = response_data['results']
    assert response.status_code == status.HTTP_200_OK
    assert len(results) == 1


@pytest.mark.django_db
def test_create_pedido(pedido):
    url = '/api/crearpedidos/'
    response = client.post(url, pedido)
    data = response.data
    id = data['id']
    assert response.status_code == status.HTTP_201_CREATED
    assert isinstance(id, str)
    assert data['estado'] == pedido['estado']
    assert data['pagado'] == pedido['pagado']
    assert data['cliente'] == pedido['cliente']
    assert data['productos'] == pedido['productos']
    assert data['envio'] == pedido['envio']
    assert data['observaciones'] == pedido['observaciones']


@pytest.mark.django_db
def test_update_pedido(pedido_create):
    url = f'/api/crearpedidos/{pedido_create.id}/'

    payload = {
            'estado': 'en ruta',
        }     
    
    response = client.patch(url, payload) 
    
    data = response.data
    assert response.status_code == status.HTTP_200_OK
    assert data['estado'] == 'en ruta'
    

@pytest.mark.django_db
def test_delete_pedido(pedido_create):
    url = f'/api/crearpedidos/{pedido_create.id}/'     
    
    response = client.delete(url) 
    
    assert response.status_code == status.HTTP_204_NO_CONTENT
    with pytest.raises(Pedido.DoesNotExist):
          pedido_create.refresh_from_db()