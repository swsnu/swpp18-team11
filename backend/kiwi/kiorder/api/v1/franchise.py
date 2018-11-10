from .base import BaseResource

from kiorder.models import Franchise
from kiorder.services.franchise import FranchiseService


class BaseFranchise(BaseResource):
    def represent_franchise(self, franchise: Franchise):
        return {
            "id": franchise.id,
            "name": franchise.name,
        }

class Franchise(BaseFranchise):
    def get(self, request):
        try:
            keyword = request.GET['keyword']
        except (KeyError, ValueError):
            self.abort(status_code=400)
        franchises = FranchiseService().search_keyword(keyword=keyword)
        return self.success([self.represent_franchise(franchise)
                             for franchise in franchises])

