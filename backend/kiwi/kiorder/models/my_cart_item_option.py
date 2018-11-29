from django.db import models

from .purchasable_option import PurchasableOption
from .my_cart_item import MyCartItem


class MyCartItemOption(models.Model):
    my_cart_item = models.ForeignKey(
        MyCartItem,
        null=False,
        on_delete=models.CASCADE
    )

    purchasable_option = models.ForeignKey(
        PurchasableOption,
        null=False,
        on_delete=models.CASCADE,
    )
    qty = models.IntegerField()

