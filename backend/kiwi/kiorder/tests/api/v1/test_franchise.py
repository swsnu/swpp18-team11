import pytest

from unittest.mock import patch, MagicMock

def test_franchise_api(client):
    with patch('kiorder.api.v1.franchise.FranchiseService') as FranchiseService:
        franchise = MagicMock("Franchise")
        franchise.id = 1
        franchise.name = "MY_FRANCHISE"

        instance = FranchiseService.return_value
        instance.search_keyword.return_value = [franchise]
        response = client.get('/kiorder/api/v1/franchise', {'keyword': 'Burger'})
        assert response.status_code == 200
        assert response.json() == {"success": True, "data": [{"id": 1, "name": "MY_FRANCHISE"}]}

def test_franchise_api_format_error(client):
    response = client.get('/kiorder/api/v1/franchise', {})
    assert response.status_code == 400

