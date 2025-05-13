from django.urls import path
from specialist.views import SpecialistListView, SpecialistRecommendationView  # ✅ Import both views

urlpatterns = [
    path('', SpecialistListView.as_view(), name='specialist-list'),
    path('recommend/', SpecialistRecommendationView.as_view(), name='specialist-recommendation'),  # 🆕 New route
]
