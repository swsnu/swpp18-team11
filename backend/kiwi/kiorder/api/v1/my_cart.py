from django.http import QueryDict

from kiorder.services.my_cart import MyCartService
from kiorder.models import MyCartItem, MyCartItemOption, User, Purchasable

from .base import BaseResource

class BaseMyCart(BaseResource):
    def represent_my_cart(self, my_cart):
        return {
            "id": my_cart.id,
            "purchasables": [
                {
                    "item_id": my_cart_item.id,
                    "purchasable_id": my_cart_item.purchasable.id,
                    "name": my_cart_item.purchasable.name,
                    "qty": my_cart_item.qty,
                    "options": [
                        {
                            "id": opt.purchasable_option.id,
                            "name": opt.purchasable_option.name,
                            "qty": opt.qty,
                        }
                        for opt in my_cart_item.mycartitemoption_set.all()
                    ]
                }
                for my_cart_item in my_cart.mycartitem_set.all()
            ]
        }

    def represent_my_cart_item(self, my_cart_item):
        return {
                    "item_id": my_cart_item.id,
                    "purchasable_id": my_cart_item.purchasable.id,
                    "name": my_cart_item.purchasable.name,
                    "qty": my_cart_item.qty,
                    "options": [
                        {
                            "id": opt.purchasable_option.id,
                            "name": opt.purchasable_option.name,
                            "qty": opt.qty,
                        }
                        for opt in my_cart_item.mycartitemoption_set.all()
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
        my_cart = my_cart_service.my_cart_of(store, user)
        return self.success({
            "list": self.represent_my_cart(my_cart)
        })

    def post(self, request):
        store = self.get_current_store()
        user = self._get_mock_user(request)
        my_cart_service = MyCartService()
        my_cart = my_cart_service.my_cart_of(store, user)

        purchasable_id = request.POST.get('purchasable_id', False)
        if not purchasable_id:
            self.abort(message="not appropriate purchasable_id input", status_code=400)
        purchasable = Purchasable.objects.get(id=purchasable_id)
        qty = request.POST.get('qty', 1)
        my_cart_item: MyCartItem(
            my_cart=my_cart,
            purchasable = purchasable,
            qty=qty
        )
        my_cart_item.save()

        options = request.POST['options']
        for option in options:
            my_cart_item_option = MyCartItemOption(
                my_cart_item=my_cart_item,
                purchasable_option_id=option.id,
                qty=option.qty
            )
            my_cart_item_option.save()

        return self.success({
               "list": self.represent_my_cart_item(my_cart_item)
        })


class MyCartItemDetail(BaseMyCart):
    def _get_my_cart_item(self, cart_item_id):
        my_cart_service = MyCartService()
        my_cart_item = my_cart_service.load_item(cart_item_id)
        if not my_cart_item: self.abort(message=f"No my_cart_item {cart_item_id}", status_code=404)
        return my_cart_item

    def _update_my_cart_item_option(self, my_cart_item, options):
        for option in options:
            item_option = my_cart_item.mycartitemoption_set.filter(id == option.id)
            if item_option:
                item_option.qty = option.qty
                item_option.save()

    def delete(self, request, cart_item_id):
        my_cart_item = self._get_my_cart_item(id)
        my_cart_item.delete()
        return self.success()

    # my_cart patch request changes: my_cart_item's quantity, options
    def patch(self, request, cart_item_id):
        data = QueryDict(request.body)
        my_cart_item_id = cart_item_id
        qty = request.POST.get('qty', False)
        options = request.POST.get('options', False)

        my_cart_item = self._get_my_cart_item(my_cart_item_id)

        if qty:
            my_cart_item.qty = qty
        if options:
            # update_my_cart_item_option saves my_cart_item_option s individually
            self._update_my_cart_item_option(my_cart_item, options)

        my_cart_item.save()
        return self.success(self.represent_my_cart_item(my_cart_item))