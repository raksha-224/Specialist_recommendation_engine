from django.db import models
from django.contrib.auth.models import User

class PredictionLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    input_text = models.TextField()
    top_prediction = models.CharField(max_length=255)
    alternatives = models.JSONField()  # stores top 3 predictions with probabilities
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.top_prediction} at {self.timestamp}"

