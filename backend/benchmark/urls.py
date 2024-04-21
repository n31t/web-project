from django.urls import path

from . import views

urlpatterns = [
    path('games/', views.games),
    path('games/<int:id>/', views.game),
    path('cpus/', views.cpus),
    path('cpus/<int:id>/', views.cpu),
    path('gpus/', views.gpus),
    path('gpus/<int:id>/', views.gpu),
]