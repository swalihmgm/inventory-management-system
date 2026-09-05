from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer, AssetSerializer, InventoryItemSerializer, AssignmentSerializer, RepairTicketSerializer
from .models import User, Asset, InventoryItem, Assignment, RepairTicket
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [IsAuthenticated]

class InventoryItemViewSet(viewsets.ModelViewSet):
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer
    permission_classes = [IsAuthenticated]

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated]

class RepairTicketViewSet(viewsets.ModelViewSet):
    queryset = RepairTicket.objects.all()
    serializer_class = RepairTicketSerializer
    permission_classes = [IsAuthenticated]
