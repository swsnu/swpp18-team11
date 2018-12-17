from django.db import models
from .mixins import UserOwnable
from .store import Store


class MyCart(UserOwnable):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)