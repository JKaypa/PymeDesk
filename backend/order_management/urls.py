from django.urls import path, include
from rest_framework import routers
from order_management import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'clientes', views.ClienteView)
router.register(r'productos', views.ProductoView)
router.register(r'obtenerpedidos', views.GetPedidoView, 'obtenerpedidos')
router.register(r'crearpedidos', views.PostPedidoView)





urlpatterns = [
    path('', include(router.urls)),
    path('resumen/', views.ResumenView.as_view()),
    path('docs/', include_docs_urls(title='Manejo de Pedidos'))
]
