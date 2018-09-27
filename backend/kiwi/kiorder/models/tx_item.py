from django.db import models

from .purchasable import Purchasable
from .tx import Tx
from .tx_log import TxLog

class TxItem(models.Model):
    purchasable = models.ForeignKey(
        Purchasable,
        null=True,
        on_delete=models.SET_NULL,
    )
    purchasable_name = models.CharField(max_length=255)
    purchasable_base_price = models.DecimalField(max_digits=19, decimal_places=10)
    qty = models.IntegerField()
    price = models.DecimalField(max_digits=19, decimal_places=10)

    total_price = models.DecimalField(max_digits=19, decimal_places=10)

    tx = models.ForeignKey(Tx, null=True, on_delete=models.CASCADE)
    tx_log = models.ForeignKey(TxLog, null=True, on_delete=models.SET_NULL)

