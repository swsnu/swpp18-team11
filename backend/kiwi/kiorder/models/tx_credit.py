from django.db import models

from .tx import Tx

class TxCredit(models.Model):
    tx = models.ForeignKey(Tx, on_delete=models.CASCADE)

    amount = models.DecimalField(max_digits=19, decimal_places=10)
    reverse = models.BooleanField(default=False)

    customer_name = models.CharField(max_length=255)
    customer_ref = models.CharField(max_length=255)
    customer_bank = models.CharField(max_length=255)

    value_date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

