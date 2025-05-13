import logging
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.contrib.auth.decorators import login_required
from accounts.models import HealthRegistration

logger = logging.getLogger(__name__)

@login_required
@require_GET
def health_status_view(request):
    """
    Check if the logged-in user has submitted their health form.
    Returns JSON response with hasSubmittedForm boolean.
    """
    logger.info("--- Entering health_status_view ---")
    try:
        has_submitted = HealthRegistration.objects.filter(user=request.user).exists()
        logger.info(f"Health form status for user {request.user.username}: {has_submitted}")
        return JsonResponse({'hasSubmittedForm': has_submitted})
    except Exception as e:
        logger.error(f"Error checking health form status: {e}")
        return JsonResponse(
            {'message': 'Error checking health form status'}, 
            status=500
        )
    finally:
        logger.info("--- Exiting health_status_view ---") 