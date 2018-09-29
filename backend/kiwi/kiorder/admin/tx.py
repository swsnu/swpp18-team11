from django.contrib import admin
from ..models import Tx

class TxAdmin(admin.ModelAdmin):
    pass

admin.site.register(Tx, TxAdmin)
