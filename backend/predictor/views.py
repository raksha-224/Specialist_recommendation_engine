from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.apps import apps
from .models import PredictionLog

class PredictView(APIView):
    authentication_classes = [SessionAuthentication]  # ✅ Now uses session auth
    permission_classes = [IsAuthenticated]

    def post(self, request):
        text = request.data.get("text")
        if not text:
            return Response({"error": "Missing 'text' field."}, status=status.HTTP_400_BAD_REQUEST)

        cfg = apps.get_app_config("predictor")
        emb = cfg.embedder.encode([text])
        proba = cfg.clf.predict_proba(emb)[0]

        top3 = sorted(zip(cfg.clf.classes_, proba), key=lambda x: x[1], reverse=True)[:3]

        PredictionLog.objects.create(
            user=request.user,
            input_text=text,
            top_prediction=top3[0][0],
            alternatives=[{"disease": d, "probability": round(p, 4)} for d, p in top3]
        )

        return Response({
            "top_prediction": top3[0][0],
            "alternatives": [
                {"disease": d, "probability": round(p, 4)} for d, p in top3
            ]
        })

