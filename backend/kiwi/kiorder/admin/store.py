from django.contrib import admin
from ..models import Store

class StoreAdmin(admin.ModelAdmin):
    pass

admin.site.register(Store, StoreAdmin)
