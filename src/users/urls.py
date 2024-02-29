from django.urls import path

from .views import UserView, loginView, logoutView, registerView

urlpatterns = [
    path("user", UserView.as_view()),
    path("login", loginView),
    path("logout", logoutView),
    path("register", registerView),
]
