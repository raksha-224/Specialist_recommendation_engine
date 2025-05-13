from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Specialist
from predictor.models import PredictionLog
from accounts.models import HealthRegistration
from .serializers import SpecialistSerializer
from .disease_specialty_map import DISEASE_TO_SPECIALTY
import re  # added for safe regex

class SpecialistListView(generics.ListCreateAPIView):
    queryset = Specialist.objects.all()
    serializer_class = SpecialistSerializer

class SpecialistRecommendationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print("SpecialistRecommendationView GET called")  # DEBUG

        # Get user's latest prediction
        prediction = PredictionLog.objects.filter(user=request.user).order_by('-timestamp').first()
        if not prediction:
            return Response({"error": "No prediction found for the user."}, status=status.HTTP_404_NOT_FOUND)

        top_disease = prediction.top_prediction.strip().lower()
        print(f"Predicted disease: '{top_disease}'")  # DEBUG

        # Get user's registration info
        registration = HealthRegistration.objects.filter(user=request.user).first()
        if not registration:
            return Response({"error": "User has not completed health registration."}, status=status.HTTP_404_NOT_FOUND)

        zip_code = registration.pincode.strip()
        print(f"ZIP Code: {zip_code}")  # DEBUG

        # Get specialists mapped to the disease
        specialties = DISEASE_TO_SPECIALTY.get(top_disease)
        print(f"Specialties: {specialties}")  # DEBUG

        if not specialties or not all(isinstance(s, str) and s.strip() for s in specialties):
            return Response(
                {"error": f"No valid specialist mapping found for disease: '{top_disease}'"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        try:
            # Build safe regex pattern
            pattern = '|'.join([re.escape(s) for s in specialties])
            print(f"Regex pattern: {pattern}")  # DEBUG

            specialists = Specialist.objects.filter(
                practice_address_zip=zip_code,
                specialty_description__iregex=pattern
            )
        except Exception as e:
            return Response({"error": f"Regex filter error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if not specialists.exists():
            return Response({"message": "No matching specialists found in your area."}, status=status.HTTP_200_OK)

        serialized = SpecialistSerializer(specialists, many=True)
        return Response({"recommended_specialists": serialized.data})
