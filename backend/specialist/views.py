from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import F
from django.db.models.functions import Lower, Trim
from .models import Specialist
from predictor.models import PredictionLog
from accounts.models import HealthRegistration
from .serializers import SpecialistSerializer
from .disease_specialty_map import get_specialists_for_disease
import re


class SpecialistListView(generics.ListCreateAPIView):
    queryset = Specialist.objects.all()
    serializer_class = SpecialistSerializer


class SpecialistRecommendationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print("SpecialistRecommendationView GET called")

        # Get latest prediction
        prediction = PredictionLog.objects.filter(user=request.user).order_by('-timestamp').first()
        if not prediction:
            return Response({"error": "No prediction found for the user."}, status=status.HTTP_404_NOT_FOUND)

        top_disease = prediction.top_prediction.strip()
        print(f"Predicted disease: '{top_disease}'")

        # Get user ZIP
        registration = HealthRegistration.objects.filter(user=request.user).first()
        if not registration:
            return Response({"error": "User has not completed health registration."}, status=status.HTTP_404_NOT_FOUND)

        zip_code = registration.pincode.strip()
        print(f"ZIP Code: {zip_code}")

        # Get mapped specialties
        specialties = get_specialists_for_disease(top_disease)
        print(f"Specialties: {specialties}")

        try:
            limit = int(request.query_params.get("limit", 3))
        except ValueError:
            limit = 3

        try:
            pattern = '|'.join([re.escape(s.lower()) for s in specialties])
            print(f"Regex pattern: {pattern}")

            # STEP 1: Match in user's ZIP
            specialists = Specialist.objects.annotate(
                normalized_specialty=Trim(Lower(F('specialty_description')))
            )

            if specialties == ["Physician"]:
                specialists = specialists.filter(
                    practice_address_zip=zip_code,
                    normalized_specialty="physician"
                )
            else:
                specialists = specialists.filter(
                    practice_address_zip=zip_code,
                    normalized_specialty__iregex=pattern
                )

            if specialists.exists():
                top_specialists = list(specialists[:limit])
                serialized = SpecialistSerializer(top_specialists, many=True)

                # ✅ Use fallback message if it's a general physician match
                message = (
                    f"We couldn’t find specialists specifically for '{top_disease}', but here are general physicians who may assist you."
                    if specialties == ["Physician"]
                    else "We've found specialists near you who can help with your condition."
                )

                return Response({
                    "recommended_specialists": serialized.data,
                    "message": message
                })

            # STEP 2: Match same specialties in other ZIPs
            print("No specialists in user's ZIP — falling back to other ZIPs")

            fallback_specialists = Specialist.objects.annotate(
                normalized_specialty=Trim(Lower(F('specialty_description')))
            )

            if specialties == ["Physician"]:
                fallback_specialists = fallback_specialists.filter(
                    normalized_specialty="physician"
                )
            else:
                fallback_specialists = fallback_specialists.filter(
                    normalized_specialty__iregex=pattern
                )

            if fallback_specialists.exists():
                top_fallbacks = list(fallback_specialists[:limit])
                serialized = SpecialistSerializer(top_fallbacks, many=True)
                return Response({
                    "recommended_specialists": serialized.data,
                    "message": "No specialists were found in your ZIP code, but here are some professionals from other areas who may assist you."
                })

            # STEP 3: Fallback to general physicians
            print("No specialty-specific matches anywhere — falling back to general physicians")

            physician_fallback = Specialist.objects.annotate(
                normalized_specialty=Trim(Lower(F('specialty_description')))
            ).filter(
                normalized_specialty="physician"
            )

            if physician_fallback.exists():
                top_physicians = list(physician_fallback[:limit])
                serialized_physicians = SpecialistSerializer(top_physicians, many=True)
                return Response({
                    "recommended_specialists": serialized_physicians.data,
                    "message": f"We couldn’t find specialists specifically for '{top_disease}', but here are general physicians who may assist you."
                })

            # STEP 4: No matches at all
            return Response({
                "message": f"We're sorry, we couldn't find any specialists or physicians for '{top_disease}' at this time."
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": f"Unexpected error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
