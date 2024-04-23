from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny

from benchmark.models import UserPC
from benchmark.serializers import UserPCSerializer

class UserPCListCreateView(generics.ListCreateAPIView):
    queryset = UserPC.objects.all()
    serializer_class = UserPCSerializer
    permission_classes = [IsAuthenticated]