from django.db import models

class PurchasableOption(models.Model):
    name = models.CharField(max_length=255)
    base_price = models.DecimalField(max_digits=19, decimal_places=10)
    max_capacity = models.IntegerField()

    def __str__(self):
        return f"{self.name} ({self.base_price})"
