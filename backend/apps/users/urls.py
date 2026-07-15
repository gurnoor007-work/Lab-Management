from django.urls import path

from .views.auth_views import (
    register_user,
    is_authenticated,
    logout,
    fetch_user,
    LoginView,
    RefreshTokenView,
)

urlpatterns = [
    path("register/", register_user, name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("refresh/", RefreshTokenView.as_view(), name="refresh"),
    path("is-authenticated/", is_authenticated, name="is_authenticated"),
    path("logout/", logout, name="logout"),
    path("fetch-user/", fetch_user, name="fetch-user"),
]
