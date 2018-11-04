import pytest

from unittest.mock import patch, MagicMock
from django.contrib.gis.geos import Point

@pytest.fixture
def franchise():
    ret = MagicMock("Franchise")
    ret.id = 999
    return ret

def test_store_api(client, franchise):
    with patch('kiorder.api.v1.store.StoreService') as StoreService, \
            patch('kiorder.api.v1.store.Franchise') as Franchise:
        Franchise.objects = MagicMock()
        Franchise.objects.get = MagicMock()
        Franchise.objects.get.return_value = franchise

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


def test_store_api_format_error(client, franchise):
    with patch('kiorder.api.v1.store.Franchise') as FranchiseModel:
        FranchiseModel.objects.get.return_value = franchise
        response = client.get('/kiorder/api/v1/franchise/999/store', {})
        assert response.status_code == 400

def test_franchise_api_not_found(client):
    with patch('kiorder.api.v1.store.Franchise') as FranchiseModel:
        class DoesNotExist(Exception):
            pass
        FranchiseModel.DoesNotExist = DoesNotExist
        FranchiseModel.objects.get.side_effect = DoesNotExist
        
        response = client.get('/kiorder/api/v1/franchise/999/store', {'lng': -99, 'lat': 99, 'radius_in_km': 1})
        print(response.content)
        assert response.status_code == 404

