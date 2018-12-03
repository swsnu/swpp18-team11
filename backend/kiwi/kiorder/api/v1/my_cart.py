from django.http import QueryDict

from kiorder.services.tx import OrderSpec, TxService
from kiorder.services.my_cart import MyCartService
from kiorder.models import MyCartItem, MyCartItemOption, User, Purchasable

from .base import BaseResource


class BaseMyCart(BaseResource):
    def represent_item_option(self, item_option: MyCartItemOption):
        option = item_option.purchasable_option
        return {
            "id": option.id,
            "name": option.name,
            "base_price": option.base_price,
            "max_capacity": option.max_capacity,
            "qty": item_option.qty
        }

    def represent_badge(self, badge):
        return {
            "id": badge.id,
            "name": badge.name,
            "icon": badge.icon and badge.icon.url or None
        }

    def represent_my_cart(self, my_cart):
        return {
            "id": my_cart.id,
            "purchasables": [
                {
                    "item_id": my_cart_item.id,
                    "purchasable_id": my_cart_item.purchasable_id,
                    "name": my_cart_item.purchasable.name,
                    "thumbnail": my_cart_item.purchasable.image and
                                 my_cart_item.purchasable.image.url or None,
                    "base_price": my_cart_item.purchasable.base_price,
                    "qty": my_cart_item.qty,
                    "options": [
                        self.represent_item_option(opt)
                        for opt in my_cart_item.mycartitemoption_set.all()
                    ],
                    "badges": [
                        self.represent_badge(badge)
                        for badge in my_cart_item.purchasable.badges.all()
                    ]
                }
                for my_cart_item in my_cart.mycartitem_set.all()
            ]
        }

    def represent_my_cart_item(self, my_cart_item):
        return {
                    "item_id": my_cart_item.id,
                    "purchasable_id": my_cart_item.purchasable_id,
                    "name": my_cart_item.purchasable.name,
                    "thumbnail": my_cart_item.purchasable.image and
                                 my_cart_item.purchasable.image.url or None,
                    "base_price": my_cart_item.purchasable.base_price,
                    "qty": my_cart_item.qty,
                    "options": [
                        self.represent_item_option(opt)
                        for opt in my_cart_item.mycartitemoption_set.all()
                    ],
                    "badges": [
                        self.represent_badge(badge)
                        for badge in my_cart_item.purchasable.badges.all()
                    ]
                }


class MyCart(BaseMyCart):
    def _get_mock_user(self, request):
        user = None
        if 'user-id' in request.session.keys() \
                and request.session['user-id'] is None:
            user_id = str(request.session['user-id'])
        else:
            user_id = '4'
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            pass
        return user

    def get(self, request):
        store = self.get_current_store()
        user = self._get_mock_user(request)
        my_cart_service = MyCartService()
        my_cart = my_cart_service.get_my_cart_of(store, user)
        return self.success(self.represent_my_cart(my_cart))

    # adds 1 my_cart_item into my_cart.
    def post(self, request):
        store = self.get_current_store()
        user = self._get_mock_user(request)
        my_cart_service = MyCartService()
        my_cart = my_cart_service.get_my_cart_of(store, user)
        tx_service = TxService()
        order_spec_line = request.POST['order_spec']
        order_spec = tx_service.parse_order_spec_line(order_spec_line, store)

        # normally order_spec contains only one purchasable_item, but it doesn't strictly have to.
        my_cart_service.create_item_by_order_spec(my_cart, order_spec)
        return self.success(self.represent_my_cart(my_cart))

    def delete(self, request):
        store = self.get_current_store()
        user = self._get_mock_user(request)
        my_cart_service = MyCartService()
        my_cart = my_cart_service.get_my_cart_of(store, user)
        my_cart_service.empty_my_cart(my_cart)
        return self.success()


class MyCartItemDetail(BaseMyCart):
    def _get_my_cart_item(self, my_cart_item_id):
        my_cart_service = MyCartService()
        my_cart_item = my_cart_service.load_item(my_cart_item_id)
        if not my_cart_item:
            self.abort(message=f"No my_cart_item {my_cart_item_id}", status_code=404)
        return my_cart_item

    def delete(self, request, my_cart_item_id):
        my_cart_item = self._get_my_cart_item(my_cart_item_id)
        my_cart_service = MyCartService()
        my_cart_service.delete_item(my_cart_item)
        return self.success()

    # my_cart patch request changes 2 property of my_cart_item: qty, options
    def patch(self, request, my_cart_item_id):
        data = QueryDict(request.body)
        my_cart_item = self._get_my_cart_item(my_cart_item_id)
        my_cart_service = MyCartService()
        # request must contain one of these 2 data:
        qty = data.get("qty", None)
        if qty is not None:
            qty = int(qty)
        if qty == 5:
            return self.abort("Not FIVEEEE")
        option_spec_line = data.get("option_spec", None)
        # patch_item method will ignore property given as None
        my_cart_item = my_cart_service.patch_item(my_cart_item, qty=qty, option_spec_line=option_spec_line)
        return self.success(self.represent_my_cart_item(my_cart_item))