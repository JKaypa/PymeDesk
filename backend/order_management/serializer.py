from rest_framework import serializers
from .models import Cliente, Producto, Pedido



class ClienteSerializer(serializers.ModelSerializer):
    pedidos = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Cliente
        fields = '__all__'


class ProductoSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Producto
        fields = '__all__'


class GetPedidoSerializer(serializers.ModelSerializer): 
    cliente = ClienteSerializer(read_only=True)
    productos = ProductoSerializer(many=True, read_only=True)

    class Meta:
        model = Pedido
        fields = '__all__'



class PostPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'


class ResumenSerializer(serializers.Serializer):
    total_pedidos = serializers.IntegerField()
    total_clientes = serializers.IntegerField()
    ciudad_con_mas_pedidos = serializers.CharField()
    producto_mas_vendido = serializers.CharField()
    total_ingresos = serializers.CharField()