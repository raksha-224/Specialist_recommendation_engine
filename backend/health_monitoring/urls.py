from django.contrib import admin
from django.urls import path, include
from specialist.views import SpecialistRecommendationView  # Ensure you're importing the correct view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),              # ✅ Your app’s URLs
    path('accounts/', include('django.contrib.auth.urls')),
    path("api/", include("predictor.urls")),  # ✅ Built-in login/logout
    path('specialist/', include('specialist.urls')),  # Specialist URLs
    path('recommend/', SpecialistRecommendationView.as_view(), name='specialist-recommendation'),  # 🆕 New route
]
