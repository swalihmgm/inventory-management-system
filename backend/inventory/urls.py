from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import UserViewSet, AssetViewSet, AssignmentViewSet, InventoryItemViewSet, RepairTicketViewSet

router = DefaultRouter()
router.register("users", UserViewSet)
router.register("assets", AssetViewSet)
router.register("assignments", AssignmentViewSet)
router.register("inventory", InventoryItemViewSet)
router.register("tickets", RepairTicketViewSet)
urlpatterns = [
    path('', include(router.urls)),
]
