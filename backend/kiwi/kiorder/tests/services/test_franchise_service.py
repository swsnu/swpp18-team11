import pytest

from kiorder.services.franchise import FranchiseService
from kiorder.models import Franchise

@pytest.mark.django_db
def test_keyword_search():
    Franchise(name="Burger King").save()
    Franchise(name="McDonalds").save()
    Franchise(name="My burger").save()

    franchises = FranchiseService().search_keyword(keyword="burger")
    assert sorted([f.name for f in franchises]) == sorted(["Burger King", "My burger"])


