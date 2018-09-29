from django.contrib import admin
from ..models import PurchasableCategory


class PurchasableCategoryAdmin(admin.ModelAdmin):
    pass

admin.site.register(PurchasableCategory, PurchasableCategoryAdmin)
