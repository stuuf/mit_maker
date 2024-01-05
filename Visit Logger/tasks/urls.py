from django.urls import path 
from . import views

urlpatterns = [
    path('', views.getpost),
    path('<int:pk>/', views.putdelete),
]