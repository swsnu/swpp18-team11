from django.db import models


from .mixins import UserOwnable
from .purchasable import Purchasable

class PurchasableCategory(UserOwnable):
    purchasables = models.ManyToManyField(Purchasable)

