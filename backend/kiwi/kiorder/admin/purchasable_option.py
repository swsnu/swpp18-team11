from django.contrib import admin
from ..models import PurchasableOption

class PurchasableOptionAdmin(admin.ModelAdmin):
    pass

admin.site.register(PurchasableOption, PurchasableOptionAdmin)

