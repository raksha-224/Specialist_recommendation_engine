from django.db import models

class Specialist(models.Model):
    npi = models.CharField(max_length=20, unique=True)
    full_name = models.CharField(max_length=255)
    credential = models.CharField(max_length=50)
    gender = models.CharField(max_length=10)
    affiliated_organizations = models.CharField(max_length=255)
    practice_address_street = models.CharField(max_length=255)
    practice_address_city = models.CharField(max_length=100)
    practice_address_state = models.CharField(max_length=100)
    practice_address_zip = models.CharField(max_length=20)
    specialty_description = models.CharField(max_length=255)

    def __str__(self):
        return self.full_name