from django.contrib import admin
from .models import User


# Register your models here.
@admin.register(User)   
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "email",
        "username",
        "is_staff",
        "is_superuser",
        "is_active",
        "last_login",
        "date_joined",
    )
    search_fields = ("id", "email", "username")
