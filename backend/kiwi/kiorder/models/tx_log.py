from django.db import models

from .mixins import UserOwnable
from .tx import Tx
from .tx_like import TxLike

class TxLog(TxLike):
    STATE_CHOICES = (
        ('ready', 'Ready'),
        ('pending', 'Pending'),
        ('done', 'Done'),
        ('cancelled', 'Cancelled'),
        ('rollback', 'Rolled back'),
    )

    state = models.CharField(
        max_length=16,
        choices=STATE_CHOICES,
        default="ready"
    )

    tx = models.ForeignKey(
        Tx,
        null=True,
        on_delete=models.SET_NULL,
    )

