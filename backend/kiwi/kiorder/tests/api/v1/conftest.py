import pytest

from unittest.mock import patch, MagicMock

@pytest.fixture
def store():
    return MagicMock("Store")
