from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import F
from django.db.models.functions import Lower, Trim
from .models import Specialist
from predictor.models import PredictionLog
from accounts.models import HealthRegistration
from .serializers import SpecialistSerializer
from .disease_specialty_map import get_specialists_for_disease
import re

class SpecialistListView(generics.ListAPIView):  # Changed to ListAPIView only
    queryset = Specialist.objects.all()
    serializer_class = SpecialistSerializer

class SpecialistRecommendationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get user's most recent prediction
        prediction = PredictionLog.objects.filter(user=request.user).order_by('-timestamp').first()
        if not prediction:
            return Response({"error": "No prediction found for the user."}, status=status.HTTP_404_NOT_FOUND)

        top_disease = prediction.top_prediction.strip()

        # Get user's ZIP code
        registration = HealthRegistration.objects.filter(user=request.user).first()
        if not registration:
            return Response({"error": "User has not completed health registration."}, status=status.HTTP_404_NOT_FOUND)

        zip_code = registration.pincode.strip()
        specialties = get_specialists_for_disease(top_disease)

        try:
            limit = int(request.query_params.get("limit", 3))
        except ValueError:
            limit = 3

        try:
            pattern = '|'.join([re.escape(s.lower()) for s in specialties])

            specialists = Specialist.objects.annotate(
                normalized_specialty=Trim(Lower(F('specialty_description')))
            ).filter(
                practice_address_zip=zip_code,
                normalized_specialty__iregex=pattern
            )[:limit]

            if not specialists:
                return Response({
                    "recommended_specialists": [],
                    "message": f"No specialists found in ZIP {zip_code} for '{top_disease}'."
                }, status=status.HTTP_200_OK)

            serialized = SpecialistSerializer(specialists, many=True)
            return Response({
                "recommended_specialists": serialized.data,
                "message": f"Here are top {len(serialized.data)} specialists near you for '{top_disease}'."
            })

        except Exception as e:
            return Response({"error": f"Unexpected error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
