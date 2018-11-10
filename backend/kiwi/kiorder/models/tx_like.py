from django.db import models

from .mixins import UserOwnable
from .store import Store
from .user import User

class TxLike(UserOwnable):
    class Meta:
        abstract = True

    utxid = models.CharField(max_length=255, unique=True)

    reversed = models.BooleanField(default=False)
    store = models.ForeignKey(Store, null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(User, default=None, on_delete=models.DO_NOTHING)

    purchase_type = models.CharField(max_length=255, null=True)
    purchase_data = models.TextField()

    total_price = models.DecimalField(max_digits=19, decimal_places=10)
    extra_props = models.TextField()
    part_ref = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def assign_to(self, another):
        for f in TxLike._meta.fields:
            name = f.name
            if name in ('created_at', 'updated_at', 'id'):
                continue
            setattr(another, name, getattr(self, name))

