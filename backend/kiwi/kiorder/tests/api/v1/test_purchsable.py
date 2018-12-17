import pytest

from unittest.mock import patch, MagicMock
from kiorder.models import Purchasable, PurchasableOption, PurchasableCategory, Badge


@pytest.mark.django_db
def test_get_purchsable(user_logged_in, client, store):
    option = PurchasableOption(
        name="Option 1",
        base_price=1000,
        max_capacity=2,
    )
    option.save()

    badge = Badge(
        name="Badge 1",
        icon=None
    )
    badge.save()

    purchasable = Purchasable(name="Purchasable With options 1", base_price=10000)
    purchasable.save()
    purchasable.purchasable_options.add(option)
    purchasable.badges.add(badge)

    category = PurchasableCategory(name="CAT")
    category.save()
    category.purchasables.add(purchasable)

    objects = MagicMock()
    objects.get = MagicMock()
    objects.get.return_value = store
    with patch('kiorder.api.v1.base.Store') as Store, \
            patch('kiorder.api.v1.purchasable.StoreService') as StoreService, \
            patch.object(Store, 'objects', objects):
        StoreService().purchasable_categories.return_value = [category]
        response = client.get('/kiorder/api/v1/purchasable')
        assert response.status_code == 200
        assert response.json() == {'success': True, 'data': {'list': [{'name': 'CAT', 'purchasables': [{'id': 1, 'name': 'Purchasable With options 1', 'thumbnail': None, 'base_price': '10000.0000000000', 'options': [{'id': 1, 'name': 'Option 1', 'base_price': '1000.0000000000', 'max_capacity': 2}], 'badges': [{'id': 1, 'name': 'Badge 1', 'icon': None}]}]}]}}


        response = client.get(f'/kiorder/api/v1/purchasable/{purchasable.id}')
        assert response.status_code == 200
        assert response.json()['data'] == {'id': 1, 'name': 'Purchasable With options 1', 'thumbnail': None, 'base_price': '10000.0000000000', 'options': [{'id': 1, 'name': 'Option 1', 'base_price': '1000.0000000000', 'max_capacity': 2}], 'badges': [{'id': 1, 'name': 'Badge 1', 'icon': None}]}

        response = client.get(f'/kiorder/api/v1/purchasable/99099')
        assert response.status_code == 200
        assert not response.json()['success']

@pytest.mark.django_db
def test_if_purchsable_is_cached(user_logged_in, client, store):

    option = PurchasableOption(
        name="Option 1",
        base_price=1000,
        max_capacity=2,
    )
    option.save()

    badge = Badge(
        name="Badge 1",
        icon=None
    )
    badge.save()

    purchasable = Purchasable(name="Purchasable With options 1", base_price=10000)
    purchasable.save()
    purchasable.purchasable_options.add(option)
    purchasable.badges.add(badge)

    category = PurchasableCategory(name="CAT")
    category.save()
    category.purchasables.add(purchasable)

    objects = MagicMock()
    objects.get = MagicMock()
    objects.get.return_value = store

    with patch('kiorder.api.v1.base.Store') as Store, \
            patch('kiorder.api.v1.purchasable.StoreService') as StoreService, \
            patch.object(Store, 'objects', objects), \
            patch('kiorder.api.v1.base.cache') as cache:
        StoreService().purchasable_categories.return_value = [category]

        cache.get.return_value = None
        response = client.get('/kiorder/api/v1/purchasable')
        assert response.status_code == 200
        cache.get.assert_called()
        cache.set.assert_called()

        key = cache.get.call_args[0][0]
        assert cache.set.call_args[0][0]
        value = cache.set.call_args[0][1]
        assert isinstance(value, str)

        old_data = response.json()

        cache.get.return_value = value
        response = client.get('/kiorder/api/v1/purchasable')
        assert response.status_code == 200
        cache.get.assert_called_with(key)
        assert len(cache.get.call_args_list) == 2
        assert len(cache.set.call_args_list) == 1
        new_data = response.json()
        assert new_data == old_data
