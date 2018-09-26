from django.db import models


from .mixins import UserOwnable, FranchiseOwnable
from .purchasable import Purchasable

class PurchasableCategory(UserOwnable, FranchiseOwnable):
    purchasables = models.ManyToManyField(Purchasable)

