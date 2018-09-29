from django.contrib import admin
from ..models import Franchise

class FranchiseAdmin(admin.ModelAdmin):
    pass

admin.site.register(Franchise, FranchiseAdmin)
