import pytest

from kiorder.services.menu import MenuService

@pytest.fixture
def menu_service():
    return MenuService()

@pytest.mark.django_db
def test_add_category(store_1, purchasable_1, menu_service):
    menu = menu_service.get_menu(store_1)
    assert len(menu.purchasable_categories) == 0
    category = menu_service.new_purchasable_category(name="Category 1")
    menu.add_purchasable_category(category)
    menu_service.save_menu(menu)

    reloaded_menu = menu_service.get_menu(store_1)
    assert len(reloaded_menu.purchasable_categories) == 1
    assert reloaded_menu.purchasable_categories.all()[0].name == 'Category 1'


@pytest.mark.django_db
def test_remove_category(store_1, purchasable_1, menu_service):
    menu = menu_service.get_menu(store_1)
    menu.add_purchasable_category(menu_service.new_purchasable_category(name="Category 1"))
    menu_service.save_menu(menu)


    reloaded_menu = menu_service.get_menu(store_1)
    reloaded_menu.remove_purchasable_category(reloaded_menu.purchasable_categories.all()[0])
    menu_service.save_menu(reloaded_menu)

    reloaded_menu = menu_service.get_menu(store_1)
    assert len(reloaded_menu.purchasable_categories.all()) == 0

@pytest.mark.django_db
def test_category_keeps_insertion_order(store_1, purchasable_1, menu_service):
    menu = menu_service.get_menu(store_1)
    menu.add_purchasable_category(menu_service.new_purchasable_category(name="Category 2"))
    menu.add_purchasable_category(menu_service.new_purchasable_category(name="Category 1"))
    menu_service.save_menu(menu)

    reloaded_menu = menu_service.get_menu(store_1)
    assert [cat.name for cat in reloaded_menu.purchasable_categories.all()] == ['Category 2', 'Category 1']


@pytest.mark.django_db
def test_add_category_with_purchasable(store_1, purchasable_1, purchasable_2, menu_service):
    menu = menu_service.get_menu(store_1)
    category = menu_service.new_purchasable_category(name="Category 1")
    category.purchasables.add(purchasable_2)
    category.purchasables.add(purchasable_1)
    menu.add_purchasable_category(category)
    menu_service.save_menu(menu)

    reloaded_menu = menu_service.get_menu(store_1)
    assert [
        purchasable.name
        for purchasable
        in reloaded_menu.purchasable_categories.all()[0].purchasables.all()
    ] == [purchasable_2.name, purchasable_1.name]


@pytest.mark.django_db
def test_add_category_with_purchasable_and_option(store_1, purchasable_1, purchasable_option_1, menu_service):
    menu = menu_service.get_menu(store_1)
    category = menu_service.new_purchasable_category(name="Category 1")
    purchasable_1.purchasable_options.add(purchasable_option_1)
    category.purchasables.add(purchasable_1)
    menu.add_purchasable_category(category)
    menu_service.save_menu(menu)

    reloaded_menu = menu_service.get_menu(store_1)
    assert reloaded_menu.purchasable_categories.all()[0].purchasables.all()[0].purchasable_options.all()[0].name == purchasable_option_1.name

