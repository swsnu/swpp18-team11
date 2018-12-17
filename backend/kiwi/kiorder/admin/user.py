from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from ..models import User

class AdjUserAdmin(UserAdmin):
    add_fieldsets = UserAdmin.add_fieldsets + (
      (None, {
          'fields': ('user_type',),
      }),
    )


print(AdjUserAdmin.add_fieldsets)
admin.site.register(User, AdjUserAdmin)
