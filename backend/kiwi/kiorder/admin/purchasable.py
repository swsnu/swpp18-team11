from django.contrib import admin
from ..models import Purchasable

class PurchasableAdmin(admin.ModelAdmin):
    pass

admin.site.register(Purchasable, PurchasableAdmin)

