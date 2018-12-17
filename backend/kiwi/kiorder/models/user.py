from django.db import models
from django.contrib.auth.models import AbstractUser
from sortedm2m.fields import SortedManyToManyField

class User(AbstractUser):
    TYPE_KIOSK = 'kiosk'
    TYPE_CUSTOMER = 'customer'
    TYPES = [TYPE_KIOSK, TYPE_CUSTOMER]

    kiosk_franchise = models.ForeignKey('Franchise',
                                        null=True,
                                        on_delete=models.SET_NULL,
                                        related_name='active_franchise_users') # for kiosk

    user_type = models.CharField(
        max_length=255, 
        default=TYPE_CUSTOMER,
        choices=[(t, t) for t in TYPES],
    )

    current_store = models.ForeignKey(
        'Store',
        null=True,
        on_delete=models.SET_NULL,
        related_name='currently_active_users',
    )

    preferred_stores = SortedManyToManyField(
        'Store',
        blank=True,
        related_name='users_preferring_this',
    )

