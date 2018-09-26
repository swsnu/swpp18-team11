from django.db import models

from .purchasable_option import PurchasableOption
from .tx_item import TxItem


class TxItemOption(models.Model):
    tx_item = models.ForeignKey(TxItem, on_delete=models.CASCADE)

    purchasable_option = models.ForeignKey(
        PurchasableOption,
        null=True,
        on_delete=models.SET_NULL,
    )
    purchasable_option_name = models.CharField(max_length=255)
    base_price = models.DecimalField(max_digits=19, decimal_places=10)
    qty = models.IntegerField()
