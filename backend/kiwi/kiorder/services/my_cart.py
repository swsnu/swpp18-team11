from dataclasses import dataclass, field

from kiorder.services.tx import OrderSpec
from kiorder.models import Store, MyCart, MyCartItem, MyCartItemOption, User, PurchasableOption
from typing import Optional



@dataclass
class MyCartService:
    def get_my_cart_of(self, store: Store, user: User):
        query = MyCart.objects.filter(store = store, user = user).first()
        if not query: # create new cart
            query = MyCart(user=user, store=store)
            query.save()
        return query

    def load(self, id) -> Optional[MyCart]:
        return MyCart.objects.filter(id=id).first()

    def load_item(self, item_id) -> Optional[MyCartItem]:
        return MyCartItem.objects.filter(id=item_id).first()

    def save_item(self, my_cart_item: MyCartItem):
        my_cart_item.save()

    def save_item_option(self, my_cart_item_option: MyCartItemOption):
        my_cart_item_option.save()

    def delete_item(self, my_cart_item: MyCartItem):
        my_cart_item.delete()

    def create_item_by_order_spec(self, my_cart: MyCart, order_spec: OrderSpec):
        for purchasable_spec in order_spec.purchasable_specs:
            my_cart_item = MyCartItem(
                my_cart=my_cart,
                purchasable=purchasable_spec.purchasable,
                qty=purchasable_spec.qty
            )
            self.save_item(my_cart_item)
            # save my_cart_item_option
            for option_spec in purchasable_spec.purchasable_option_specs:
                self.create_item_option(my_cart_item, option_spec.purchasable_option, option_spec.qty)

    def create_item_option(self, my_cart_item: MyCartItem, purchasable_option: PurchasableOption, qty):
        my_cart_item_option = MyCartItemOption(
            my_cart_item=my_cart_item,
            purchasable_option=purchasable_option,
            qty=qty
        )
        self.save_item_option(my_cart_item_option)
        return my_cart_item_option

    def empty_my_cart(self, my_cart: MyCart):
        for my_cart_item in my_cart.mycartitem_set.all():
            self.delete_item(my_cart_item)

    def patch_item(self, my_cart_item, qty=None, option_spec_line=None):
        # patch qty
        if qty is not None and qty > 0:
            my_cart_item.qty = qty
        self.save_item(my_cart_item)
        # patch option
        if option_spec_line is not None:
            parts = option_spec_line.split()
            for option_line in parts:
                opt_id, opt_qty = map(lambda x: int(x), option_line.split("-"))
                new_option = PurchasableOption.objects.filter(id=opt_id).first()
                item_option = my_cart_item.mycartitemoption_set\
                    .filter(purchasable_option=new_option).first()
                if item_option is not None:
                    if opt_qty == 0:
                        item_option.delete()  # delete zeroed option
                    elif opt_qty > 0:
                        item_option.qty = opt_qty
                        self.save_item_option(item_option)
                else: # if item_option is None: create new item_option
                    if opt_qty is not 0:
                        item_option = self.create_item_option(my_cart_item, new_option, opt_qty)
                        self.save_item_option(item_option)
        return my_cart_item