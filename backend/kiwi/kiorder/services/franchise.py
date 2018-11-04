from ..models import Franchise
from typing import List

class FranchiseService:
    def search_keyword(self, *, keyword: str, limit: int = 100) -> List[Franchise]:
        return Franchise.objects.filter(name__icontains=keyword)[:limit]

