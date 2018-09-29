from django.db import models

from .purchasable import Purchasable
from .store import Store
from .tx_like import TxLike

class Tx(TxLike):
    class Meta:
        indexes = [
            models.Index(fields=['user', 'created_at']),
            models.Index(fields=['user', 'store', 'created_at']),
        ]

    def credit_amount(self):
        return sum(
            (-credit.amount if credit.reverse else credit.amount)
            for credit in self.txcredit_set.all()
        )

