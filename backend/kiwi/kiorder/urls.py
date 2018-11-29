from django.urls import path
from .views import hello_world, order_tts
from . import api

urlpatterns = [
    path('api/v1/franchise', api.v1.franchise.Franchise.as_view()),
    path('api/v1/franchise/<int:franchise_id>/store', api.v1.store.StoreOfFranchise.as_view()),
    path('api/v1/purchasable', api.v1.purchasable.Purchasable.as_view()),
    path('api/v1/purchasable/<int:id>', api.v1.purchasable.Purchasable.as_view()),
    path('api/v1/test_tx', api.v1.test_tx.TestTx.as_view()),
    path('api/v1/test_tx/<int:user_id>', api.v1.test_tx.TestTx.as_view()),
    path('api/v1/test_tx/<str:utxid>/finish', api.v1.test_tx.TestTxFinish.as_view()),
    path('api/v1/mycart/', api.v1.my_cart.MyCart.as_view()),
    path('api/v1/mycart/<int:my_cart_item_id>', api.v1.my_cart.MyCartItemDetail.as_view()),
    path('api/v1/ticket', api.v1.ticket.Ticket.as_view()),
    path('api/v1/ticket/<int:id>', api.v1.ticket.TicketDetail.as_view()),
    path('hello', hello_world),
    path('api/v1/order_tts', order_tts),
]
