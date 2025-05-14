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
                    npi=row['npi'],
                    full_name=row['full_name'],
                    credential=row['credential'],
                    gender=row['gender'],
                    affiliated_organization=row['affiliated_organization'],
                    practice_address_street=row['practice_address_street'],
                    practice_address_city=row['practice_address_city'],
                    practice_address_zip=row['practice_address_zip'],
                    practice_address_state=row['practice_address_state'],
                    specialty_description=row['specialty_description'],
                )
        self.stdout.write(self.style.SUCCESS('✅ Successfully imported specialists'))
