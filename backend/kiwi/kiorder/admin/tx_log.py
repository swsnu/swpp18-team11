from django.contrib import admin
from ..models import TxLog

class TxLogAdmin(admin.ModelAdmin):
    pass

admin.site.register(TxLog, TxLogAdmin)
