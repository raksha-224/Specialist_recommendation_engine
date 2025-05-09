# backend/predictor/urls.py
from django.urls import path
from .views import PredictView

urlpatterns = [
    path("predict/", PredictView.as_view(), name="predict"),
]
