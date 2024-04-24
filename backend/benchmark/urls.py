from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import views, generic_v

urlpatterns = [
    path('register/', views.register),
    path('login/', TokenObtainPairView.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    # path('games/', views.games),
    path('games/', generic_v.GameListCreateView.as_view()),
    # path('games/<int:id>/', views.game),
    path('games/<int:pk>/', generic_v.GameRetrieveUpdateDestroyView.as_view()),
    path('games/name/<str:name>/', views.game_by_name),

    # path('cpus/', views.cpus),
    path('cpus/', generic_v.CPUListCreateView.as_view()),
    # path('cpus/<int:id>/', views.cpu),
    path('cpus/<int:pk>/', generic_v.CPURetrieveUpdateDestroyView.as_view()),
    # path('gpus/', views.gpus),
    path('gpus/', generic_v.GPUListCreateView.as_view()),
    # path('gpus/<int:id>/', views.gpu),
    path('gpus/<int:pk>/', generic_v.GPURetrieveUpdateDestroyView.as_view()),
    path('userpc/', generic_v.UserPCListCreateView.as_view()),
    path('userpc/<int:pk>/', generic_v.UserPCRetrieveUpdateDestroyView.as_view()),
]
