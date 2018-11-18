import json

from django.contrib.auth import authenticate, login, logout
from kiorder.models import User, Store

from .base import BaseResource

class BaseUser(BaseResource):
    def represent_user(self, user: User):
        most_preferred_store = user.preferred_stores.all()[0]
        return {
            "user_type": user.user_type,
            "current_store_id": user.current_store_id,
            "most_preferred_store_id": most_preferred_store and most_preferred_store.id,
        }


class MySelf(BaseUser):
    login_required = True

    def get(self, request):
        return self.success(self.represent_user(request.user))


class SignUp(BaseUser):
    def post(self, request):
        username, password = request.POST['username'], request.POST['password']

        if username.strip() == '':
            self.abort(code="SIGNUP-002", message="Username cannot be blank")
        elif User.objects.filter(username=username).exists():
            self.abort(code="SIGNUP-002", message="Username already taken")
        elif password.stirp() == '':
            self.abort(code="SIGNUP-003", message="Password cannot be blank")

        try:
            User.objects.create_user(username=username, password=password)
        except Exception:
            self.abort(code="SIGNUP-001", message="Failed to sign up. Try again.")

        return self.success(self.represent_user(usr))



class SignIn(BaseUser):
    def post(self, request):
        username, password = request.POST['username'], request.POST['password']
        user = authenticate(username=username, password=password)
        if user is None:
            self.abort(code="SIGNIN-001", message="Not authenticated", status_code=401)
        login(request, user)
        return self.success(self.represent_user(user))


class SignOut(BaseUser):
    login_required = True

    def get(self, request):
        logout(request)
        return self.success()


class CurrentStore(BaseUser):
    login_required = True

    def post(self, request):
        user = request.user
        try:
            store_id = int(request.POST['store_id'])
            store = Store.objects.get(id=store_id)
        except (KeyError, ValueError):
            self.abort(status_code=400)
        except Store.DoesNotExist:
            self.abort(status_code=404)
        user.current_store = store
        user.save()
        return self.success(self.represent_user(user))

