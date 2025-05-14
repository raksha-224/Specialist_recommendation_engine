from django.urls import path
from .views import SpecialistListView
from specialist.views import SpecialistListView, SpecialistRecommendationView  # ✅ Import both views

urlpatterns = [
    path('', SpecialistListView.as_view(), name='specialist-list'),
    path('recommend/', SpecialistRecommendationView.as_view(), name='specialist-recommendation'), 
    path('api/specialists/', SpecialistListView.as_view(), name='specialist-list'), # 🆕 New route
]
