import pytest

from unittest.mock import patch, MagicMock
from django.contrib.gis.geos import Point

@pytest.mark.django_db
def test_store_api(user_logged_in, client, franchise):
    franchise.id = 999
    objects = MagicMock()
    objects.get = MagicMock()
    objects.get.return_value = franchise
    with patch('kiorder.api.v1.store.StoreService') as StoreService, \
            patch('kiorder.api.v1.store.Franchise') as Franchise, \
            patch.object(Franchise, 'objects', objects):
        store = MagicMock("Franchise")
        store.id = 1
        store.name = "MY_STORE"
        store.location = Point(-50, 50)
        store.franchise = franchise
        store.timezone = "UTC"

        instance = StoreService.return_value
        instance.search_nearby.return_value = [store]
        response = client.get('/kiorder/api/v1/franchise/999/store', {'lng': -99, 'lat': 99, 'radius_in_km': 1})
        assert response.status_code == 200
        assert response.json() == {'data': [{'id': 1, 'franchise_id': 999, 'location': {'lat': 50.0, 'lng': -50.0}, 'name': 'MY_STORE', 'timezone': 'UTC'}], 'success': True}
        instance.search_nearby.assert_called_with(franchise=franchise, lat=99.0, lng=-99.0, radius=1)

@pytest.mark.django_db
def test_store_api_format_error(user_logged_in, client, franchise):
    franchise.id = 999
    with patch('kiorder.api.v1.store.Franchise') as FranchiseModel:
        FranchiseModel.objects.get.return_value = franchise
        response = client.get('/kiorder/api/v1/franchise/999/store', {})
        assert response.status_code == 400

@pytest.mark.django_db
def test_franchise_api_not_found(user_logged_in, client, franchise):
    franchise.id = 999
    with patch('kiorder.api.v1.store.Franchise') as FranchiseModel:
        class DoesNotExist(Exception):
            pass
        FranchiseModel.DoesNotExist = DoesNotExist
        FranchiseModel.objects.get.side_effect = DoesNotExist

        response = client.get('/kiorder/api/v1/franchise/999/store', {'lng': -99, 'lat': 99, 'radius_in_km': 1})
        print(response.content)
        assert response.status_code == 404
