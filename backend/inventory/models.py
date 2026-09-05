from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
# Create your models here.

class User(AbstractUser):
    ROLE_CHOICES = (
        ('ADMIN', 'Admin'),
        ('EMPLOYEE', 'Employee'),
    )

    role = models.CharField(
        max_length= 10,
        choices= ROLE_CHOICES,
        default= "EMPLOYEE"
    )

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
    
class Asset(models.Model):
    STATUS_CHOICES = (
        ('AVAILABLE', 'Available'),
        ('ASSAIGNED', 'Assaigned'),
        ('UNDER_REPAIR', 'Under repair'),
    )
    name = models.CharField(max_length=100)
    asset_type = models.CharField(max_length=100)
    serial_number = models.CharField(max_length=10, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='AVAILABLE')
    purchase_date = models.DateField()

    def __str__(self):
        return f"{self.name} {self.serial_number}"
    
class InventoryItem(models.Model):
    item_type = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    quantity= models.PositiveIntegerField(default=1)
    threshold= models.PositiveIntegerField(default=5)

    def __str__(self):
        return f"{self.item_type}, qty: {self.quantity}"
    
class Assignment(models.Model):
     asset = models.ForeignKey(Asset,on_delete=models.CASCADE, related_name='assaignments')
     employee = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assaignments')
     date_assigned = models.DateField(auto_now_add=True)
     date_returned = models.DateField(null=True, blank=True)

     def __str__(self):
         return f"{self.asset} assigned to: {self.employee}"
     
class RepairTicket(models.Model):
    STATUS_CHOICES =(
        ('PENDING', 'Pending'),
        ('IN_PROGRESS', 'In progress'),
        ('FIXED', 'Fixed'),
    )
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name='repair_tickets')
    issue = models.TextField()
    status = models.CharField(max_length=20, choices= STATUS_CHOICES, default= 'PENDING')
    assigned_technician = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank= True, related_name='technician_tickets')

    def __str__(self):
        return f"Ticke for {self.asset.name} - status{self.status}"
