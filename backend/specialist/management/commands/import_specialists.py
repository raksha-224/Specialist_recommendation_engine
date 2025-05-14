import csv
from django.core.management.base import BaseCommand
from specialist.models import Specialist  # ✅ import your model

class Command(BaseCommand):
    help = 'Import specialists from data007.csv'

    def handle(self, *args, **kwargs):
        with open('data007.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                Specialist.objects.create(
                    specialist_id=row['specialist_id'],
                    name=row['name'],
                    gender=row['gender'],
                    npi=row['npi'],
                    license=row['license'],
                    phone=row['phone'],
                    address=row['address'],
                    specialty=row['specialty'],
                )
        self.stdout.write(self.style.SUCCESS('✅ Successfully imported specialists'))
