from django.db import models, transaction
from uuid import uuid4

from kiorder.models import Purchasable, PurchasableOption, User, Tx, TxItem, TxItemOption
from kiorder.services.tx import TxService, OrderSpec, PurchaseMethod
from kiorder.services.ticket import TicketService
from datetime import date
from .base import BaseResource
from .purchasable import Purchasable as PurchasableView

class TestPurchaseMethod(PurchaseMethod):
    pass
TestPurchaseMethod.register_as("test")


class BaseTx(BaseResource):
    pass

class TestTx(BaseTx):
    def get(self, request, user_id):
        def represent_purchasable(purch):
            p = PurchasableView()
            return p.represent_purchasable(purch)

        tx_items = [{'purchasable': represent_purchasable(tx_item.purchasable),
                     'purchasable_name': tx_item.purchasable.name,
                     'purchasable_base_price': tx_item.purchasable_base_price,
                     'qty': tx_item.qty,
                     'price': tx_item.price,
                     'total_price': tx_item.price,
                     'options': [{
                         'name': option.purchasable_option.name,
                         'base_price': option.base_price,
                         'qty': option.qty,
                         'total_price': option.total_price
                     } for option in TxItemOption.objects.all() if option.tx_item.id == tx_item.id],
                     'created_at': tx_item.tx.created_at,
                     'state': tx_item.tx.ticket.get().state}
                    for tx_item in TxItem.objects.all() if tx_item.tx.user.id == user_id]

        return self.success(tx_items)

    @transaction.atomic
    def post(self, request):
        tx_service = TxService()
        today = date.today()
        utxid = f"{today.strftime('%Y%m%d')}_{uuid4()}"
        user = None
        if 'user-id' in request.session.keys() \
                and request.session['user-id'] is None:
            user_id = str(request.session['user-id'])
        else:
            user_id = '2'
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            pass

        store = self.get_current_store()
        order_spec_line = request.POST['order_spec']
        order_spec = tx_service.parse_order_spec_line(fmt=order_spec_line, store=store)
        part_ref = request.POST.get('part_ref', '')
        order_tx = tx_service.prepare_order(
            utxid=utxid,
            user=user,
            order_spec=order_spec,
            part_ref=part_ref
        )
        tx_service.start_order(order_tx=order_tx, purchase_method=TestPurchaseMethod())
        return self.success({"utxid": utxid})

class TestTxFinish(BaseTx):
    @transaction.atomic
    def post(self, request, utxid):
        tx_service = TxService()
        ticket_service = TicketService()
        order_tx = tx_service.load(utxid)
        if not order_tx: self.abort(message=f"Order tx({utxid}) not found", status_code=404)
        with tx_service.finish_order(order_tx) as creditor:
            # creditor.credit_order(amount=1000, name="John", ref="123-456", bank="NHBank")
            pass

        ticket = ticket_service.ticket_of_tx(utxid)
        return self.success({
            "utxid": utxid,
            "ticket_id": ticket and ticket.id,
            "ticket_number": ticket and ticket.number,
        })

