from django.db import models

from .my_cart import MyCart
from .purchasable import Purchasable


# container of purchasable with qty
class MyCartItem(models.Model):

    my_cart = models.ForeignKey(
        MyCart,
        null=False,
        on_delete=models.CASCADE,
    )
    purchasable = models.ForeignKey(
        Purchasable,
        null=True,
        on_delete=models.CASCADE,
    )
    qty = models.IntegerField()
