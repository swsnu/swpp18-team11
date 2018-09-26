from django.db import models

from .mixins import UserOwnable
from .tx import Tx, TxLike

class TxLog(TxLike):
    STATE_CHOICES = (
        ('ready', 'Ready'),
        ('done', 'Delivered'),
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

