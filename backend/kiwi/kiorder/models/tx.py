from django.db import models

from .mixins import UserOwnable
from .purchasable import Purchasable
from .store import Store

class TxLike(UserOwnable):
    class Meta:
        abstract = True

    utxid = models.CharField(max_length=255, unique=True)

    reversed = models.BooleanField(default=False)
    store = models.ForeignKey(Store, null=True, on_delete=models.SET_NULL)

    purchase_type = models.CharField(max_length=255)

    price = models.DecimalField(max_digits=19, decimal_places=10)
    qty = models.IntegerField()

    extra_props = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Tx(TxLike):
    class Meta:
        indexes = [
            models.Index(fields=['user', 'created_at']),
            models.Index(fields=['user', 'store', 'created_at']),
        ]

