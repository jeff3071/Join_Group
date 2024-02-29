from django.urls import path

from .views import CreateGroupView, GroupView, ListGroupView

urlpatterns = [
    path("get_near_group", GroupView.as_view({"post": "list"})),
    path("get_group", GroupView.as_view({"post": "post"})),
    path("create_group", CreateGroupView.as_view()),
    path("list_group", ListGroupView.as_view()),
    path("update_group", GroupView.as_view({"post": "update"})),
]
