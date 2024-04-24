from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication

from benchmark.models import UserPC, CPU, GPU, Game
from benchmark.serializers import UserPCSerializer, CPUSerializer, GPUSerializer, GameSerializer

class GameListCreateView(generics.ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    # permission_classes = [IsAuthenticated]

class GameRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    # permission_classes = [IsAuthenticated]

class UserPCListCreateView(generics.ListCreateAPIView):
    # queryset = UserPC.objects.all()
    serializer_class = UserPCSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get_queryset(self):
        return UserPC.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserPCRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    # queryset = UserPC.objects.all()
    serializer_class = UserPCSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get_queryset(self):
        user = self.request.user
        return UserPC.objects.filter(user=user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CPUListCreateView(generics.ListCreateAPIView):
    queryset = CPU.objects.all()
    serializer_class = CPUSerializer
    # permission_classes = [IsAuthenticated]

class CPURetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CPU.objects.all()
    serializer_class = CPUSerializer
    # permission_classes = [IsAuthenticated]

class GPUListCreateView(generics.ListCreateAPIView):
    queryset = GPU.objects.all()
    serializer_class = GPUSerializer
    # permission_classes = [IsAuthenticated]

class GPURetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GPU.objects.all()
    serializer_class = GPUSerializer
    # permission_classes = [IsAuthenticated]

