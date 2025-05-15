from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from accounts.views import (
    login_view,
    register_view,
    health_register_view,
    health_register_get_view,
    health_status_view
)

urlpatterns = [
    path('register/', register_view, name='register'),
    path('health/register/', health_register_view, name='health-register'),
    path('health/status/', health_status_view, name='health-status'),
    path('login/', login_view, name='login'),
    path('accounts/login/', obtain_auth_token),
    path('health/', health_register_get_view, name='health-register-get')
]

