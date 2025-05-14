import csv
import os
from django.core.management.base import BaseCommand
from specialist.models import Specialist
from django.conf import settings  # ✅ Add this

class Command(BaseCommand):
    help = 'Import specialists from data007.csv'

    def handle(self, *args, **kwargs):
        file_path = os.path.join(settings.BASE_DIR, 'data007.csv')  # ✅ Use absolute path

        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                Specialist.objects.create(
                    specialist_id=row['npi'],
                    name=row['full_name'],
                    gender=row['gender'],
                    npi=row['npi'],
                    license=row['credential'],
                    phone=row.get('phone', ''),
                    address=row.get('practice_address_street', ''),
                    specialty=row['specialty_description'],
                )
        self.stdout.write(self.style.SUCCESS('✅ Successfully imported specialists'))
