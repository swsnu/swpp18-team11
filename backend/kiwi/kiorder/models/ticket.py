from django.db import models

from .mixins import UserOwnable
from .tx import Tx
from .store import Store

class Ticket(UserOwnable):
    class Meta:
        indexes = [
            models.Index(fields=['store', 'removed', 'created_at']),
        ]

    STATE_CHOICES = (
        ('todo', 'Todo'),
        ('doing', 'Doing'),
        ('done', 'Done'),
    )

    state = models.CharField(
        max_length=16,
        choices=STATE_CHOICES,
        default="todo"
    )
    number = models.IntegerField()

    removed = models.BooleanField(default=False)

    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    tx = models.ForeignKey(Tx, on_delete=models.CASCADE, related_name='ticket')

    denorm_data = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

