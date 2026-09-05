from django.contrib import admin
from .models import User, Asset,InventoryItem, Assignment,RepairTicket

# Register your models here.

admin.site.register(User)
admin.site.register(InventoryItem)
admin.site.register(Assignment)
admin.site.register(RepairTicket)

@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ('name', 'status', 'purchase_date')
    list_filter = ('status',)
    search_fields = ('name',)
    ordering = ('purchase_date',)