import uuid
from .choices import estado, envio
from django.db import models

# Create your models here.

class Cliente(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=50, unique=True)
    celular = models.CharField(max_length=20, unique=True) 
    correo = models.EmailField(unique=True)
    direccion = models.CharField(max_length=100)
    ciudad = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=50, unique=True)
    precio = models.PositiveIntegerField()
    cantidad = models.PositiveIntegerField()

    def __str__(self):
        return self.nombre


class Pedido(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    estado = models.CharField(max_length=20, choices=estado)
    pagado = models.BooleanField(default=False)
    cliente = models.ForeignKey(Cliente, related_name= 'pedidos', null=True, blank=True, on_delete=models.CASCADE)
    productos = models.ManyToManyField(Producto)
    envio = models.CharField(max_length=20, choices=envio)
    observaciones = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.id)

