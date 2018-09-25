from django.db import models

from .mixins import UserOwnable
from .purchasable_option import PurchasableOption

class Purchasable(UserOwnable):
    name = models.CharField(max_length=255)
    base_price = models.DecimalField(max_digits=19, decimal_places=10)

    purchasable_options = models.ManyToManyField(PurchasableOption)

