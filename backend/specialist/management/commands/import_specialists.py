import csv
from django.core.management.base import BaseCommand
from specialist.models import Specialist

class Command(BaseCommand):
    help = 'Import specialists from a CSV file'

    def handle(self, *args, **kwargs):
        with open('data007.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                Specialist.objects.create(
                    name=row['name'],
                    npi=row['npi'],
                    specialty=row['specialty'],
                    location=row['location'],
                    phone=row['phone']
                )
        self.stdout.write(self.style.SUCCESS('✅ Successfully imported specialist data'))
