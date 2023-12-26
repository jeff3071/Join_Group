from django.urls import path
from .views import loginView, registerView, logoutView, UserView

urlpatterns = [
    path('user', UserView.as_view()),
    path('login', loginView),
    path('logout', logoutView),
    path('register', registerView),
]