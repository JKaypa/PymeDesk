from rest_framework import viewsets, filters
from django.db.models import Count, Sum, F
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Cliente, Producto, Pedido
from .serializer import (ClienteSerializer, ProductoSerializer, PostPedidoSerializer,                
GetPedidoSerializer, ResumenSerializer)


# Create your views here.

class ClienteView(viewsets.ModelViewSet):
    queryset = Cliente.objects.order_by('nombre')
    serializer_class = ClienteSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'correo', 'nombre', 'ciudad']


class ProductoView(viewsets.ModelViewSet):
    queryset = Producto.objects.order_by('nombre')
    serializer_class = ProductoSerializer


class GetPedidoView(viewsets.ModelViewSet):
    queryset = Pedido.objects.order_by('cliente__nombre')
    serializer_class = GetPedidoSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['pagado']
    search_fields = ['id', 'cliente__nombre', 'envio', 'estado']
    

class PostPedidoView(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PostPedidoSerializer


class ResumenView(APIView):
    def get(self, request):
        total_pedidos = Pedido.objects.count()
        total_clientes = Cliente.objects.count()

        ciudad_num_pedidos = Pedido.objects.values('cliente__ciudad').annotate(num_pedidos=Count('cliente__ciudad')).order_by('-num_pedidos').first()
        if ciudad_num_pedidos:
            ciudad = ciudad_num_pedidos['cliente__ciudad']
            num_pedidos = ciudad_num_pedidos['num_pedidos']
            ciudad_con_mas_pedidos = f'{ciudad} ({num_pedidos} pedidos)' 
        else:
            ciudad_con_mas_pedidos = 'No hay pedidos'

        producto_vendido = Pedido.objects.values('productos__nombre').annotate(cant_vendida=Sum('productos__cantidad')).order_by('-cant_vendida').first()
        if producto_vendido:
            producto = producto_vendido['productos__nombre']
            cantidad = producto_vendido['cant_vendida']
            producto_mas_vendido = f'{producto} ({cantidad} vendidos)'
        else:
            producto_mas_vendido = 'No hay pedidos'

        ingresos = Pedido.objects.aggregate(ingresos=Sum(F('productos__precio') * F('productos__cantidad')))
        if ingresos['ingresos']:
            total_ingresos = f'${ingresos["ingresos"]}'
        else:
            total_ingresos = 'No hay pedidios'

        resumen = {
            'total_pedidos': total_pedidos ,
            'total_clientes': total_clientes,
            'ciudad_con_mas_pedidos': ciudad_con_mas_pedidos,
            'producto_mas_vendido': producto_mas_vendido,
            'total_ingresos': total_ingresos
        }

        serializer = ResumenSerializer(resumen)
        return Response(serializer.data)
    