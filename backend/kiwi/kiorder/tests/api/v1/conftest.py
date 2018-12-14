import pytest

from unittest.mock import patch, MagicMock
from django.conf import settings
from django.contrib.gis.geos import Point
from kiorder.models import User, Franchise, Store

@pytest.fixture
def store(franchise):
    store = Store(
        name="KINGKFC Nakseongdae",
        location=Point(0, 0),
        franchise=franchise,
        timezone="UTC",
    )
    return store


@pytest.fixture
def franchise():
    f = Franchise(name="King KFC")
    return f

@pytest.fixture
def current_user(store):
    user = User.objects.create_user(
        username="user",
        password="pwd",
        email="admin@example.com",
    )
    store.franchise.save()
    store.save()
    user.current_store = store
    user.save()
    return user

@pytest.fixture
def user_logged_in(current_user, client):
    client.force_login(current_user)
    yield current_user
