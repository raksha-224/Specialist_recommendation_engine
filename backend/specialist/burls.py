# backend/specialist/urls.py
from django.urls import path
from .views import SpecialistListView

urlpatterns = [
    path('api/specialists/', SpecialistListView.as_view(), name='specialist-list'),
]
