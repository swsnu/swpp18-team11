from django.db import models, transaction
from uuid import uuid4

from kiorder.models import Purchasable, PurchasableOption
from kiorder.services.tx import TxService, OrderSpec, PurchaseMethod
from kiorder.services.ticket import TicketService
from datetime import date

from .base import BaseResource

class TestPurchaseMethod(PurchaseMethod):
    pass
TestPurchaseMethod.register_as("test")


class BaseTx(BaseResource):
    pass


class TestTx(BaseTx):
    @transaction.atomic
    def post(self, request):
        tx_service = TxService()
        today = date.today()
        utxid = f"{today.strftime('%Y%m%d')}_{uuid4()}"

        order_spec_line = request.POST['order_spec']
        order_spec = self.parse_order_spec_line(order_spec_line)
        part_ref = request.POST.get('part_ref', '')
        order_tx = tx_service.prepare_order(
            utxid=utxid,
            order_spec=order_spec,
            part_ref=part_ref
        )
        tx_service.start_order(order_tx=order_tx, purchase_method=TestPurchaseMethod())
        return self.success({"utxid": utxid})

    def parse_order_spec_line(self, fmt: str) -> OrderSpec:
        "parse order spec format: e.g 1-1#1-2#3-4 2-1"
        order_spec = OrderSpec(store=self.get_current_store())
        try:
            for line in fmt.split():
                parts = line.split("#")
                purchasable_id, purchasable_qty = parts[0].split("-")
                purchasable_id = int(purchasable_id)
                purchasable_qty = int(purchasable_qty)
                if purchasable_qty <= 0:
                    raise ValueError("Qty cannot be negative")
                purchasable = Purchasable.objects.get(id=purchasable_id)
                opt_spec = order_spec.add_purchasable(purchasable, purchasable_qty)

                for option_line in parts[1:]:
                    opt_id, opt_qty = option_line.split("-")
                    opt_id = int(opt_id)
                    opt_qty = int(opt_qty)
                    if opt_qty <= 0:
                        raise ValueError("Option Qty cannot be negative")
                    opt = PurchasableOption.objects.get(id=opt_id)
                    opt_spec.add_option(opt, opt_qty)
        except ValueError:
            self.abort("BADREQ-001", "Bad request", 400)
        return order_spec



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
