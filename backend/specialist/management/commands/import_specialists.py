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
                    npi=row['npi'],
                    name=row['full_name'],
                    credential=row['credential'],
                    gender=row['gender'],
                    organization=row['affiliated_organization'],
                    street=row['practice_address_street'],
                    city=row['practice_address_city'],
                    state=row['practice_address_state'],
                    zip=row['practice_address_zip'],
                    phone=row.get('telephone_number', ''),  # optional safety
                    license=row.get('medical_license_number', ''),
                )
        self.stdout.write(self.style.SUCCESS('✅ Successfully imported specialists'))
