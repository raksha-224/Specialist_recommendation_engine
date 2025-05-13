import json
import logging
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt  # **TEMPORARY - FOR TESTING ONLY**
from accounts.forms import HealthRegistrationForm
from accounts.models import HealthRegistration
import traceback

logger = logging.getLogger(__name__)

@csrf_exempt  # **TEMPORARY - REMOVE IN PRODUCTION**
#@require_POST
def health_register_view(request):
    logger.info("--- Entering health_register_view ---")
    try:
        logger.info(f"Request method: {request.method}")
        logger.info(f"Request headers: {request.headers}")  # Log all headers
        logger.info(f"Request body: {request.body}")  # Log the raw request body
        data = json.loads(request.body)
        logger.info(f"Parsed data: {data}")

        form = HealthRegistrationForm(data)
        if form.is_valid():
            instance = form.save(commit=False)
            instance.user = request.user
            instance.save()
            logger.info(f"Created new health registration for user {request.user.username}")
            return JsonResponse({
                'message': "Health registration submitted successfully",
                'is_update': False
            })
        else:
            logger.warning(f"Form errors: {form.errors}")
            return JsonResponse({'errors': form.errors}, status=400)

    except json.JSONDecodeError:
        logger.error("Invalid JSON format received")
        return JsonResponse({'message': 'Invalid JSON format'}, status=400)
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}")
        logger.error(traceback.format_exc())  # Log the full traceback
        return JsonResponse({'message': f'An unexpected error occurred: {e}'}, status=500)
    finally:
        logger.info("--- Exiting health_register_view ---")