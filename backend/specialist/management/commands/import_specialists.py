import csv
from django.core.management.base import BaseCommand
from specialist.models import Specialist

class Command(BaseCommand):
    help = 'Import specialists from data007.csv'

    def handle(self, *args, **kwargs):
        with open('data007.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                Specialist.objects.create(
                    specialist_id=row['npi'],
                    name=row['full_name'],
                    gender=row['gender'],
                    npi=row['npi'],
                    license=row['credential'],
                    phone='N/A',  # Not available in current CSV
                    address=f"{row['practice_address_street']}, {row['practice_address_city']}, {row['practice_address_state']} {row['practice_address_zip']}",
                    specialty=row['specialty_description']
                )
        self.stdout.write(self.style.SUCCESS('✅ Successfully imported specialists'))
