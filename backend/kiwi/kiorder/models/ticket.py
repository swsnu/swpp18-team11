from django.db import models

from .mixins import UserOwnable
from .tx import Tx
from .store import Store

class Ticket(UserOwnable):
    STATE_CHOICES = (
        ('waiting', 'Waiting'),
        ('doing', 'Doing'),
        ('done', 'Done'),
    )

    state = models.CharField(
        max_length=16,
        choices=STATE_CHOICES,
        default="waiting"
    )
    number = models.IntegerField()

    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    tx = models.ForeignKey(Tx, on_delete=models.CASCADE)

    denorm_data = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

