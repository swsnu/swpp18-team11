from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Store

# Register your models here.
class StoreAdmin(admin.ModelAdmin):
    pass


admin.site.register(User, UserAdmin)
admin.site.register(Store, StoreAdmin)
