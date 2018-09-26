from django.db import models

from .user import User

class UserOwnable(models.Model):
    class Meta:
        abstract = True
    user = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL,
    )


class FranchiseOwnable(models.Model):
    class Meta:
        abstract = True
    franchise = models.ForeignKey(
        "Franchise",
        null=True,
        on_delete=models.SET_NULL,
    )

