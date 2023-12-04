from django.urls import path
from .views import UserView, LoginView, UserView, LogoutView, listUsersView

urlpatterns = [
    path('user', UserView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('list', listUsersView.as_view())
]