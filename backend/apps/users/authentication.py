from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
import logging

logger = logging.getLogger(__name__)


class Authentication(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get("access_token")

        if not access_token:
            logger.warning("Authentication failed: No access token")
            return None

        try:
            validated_token = self.get_validated_token(access_token)
            user = self.get_user(validated_token)
            logger.info("User authenticated: %s", user.id)
            return (user, validated_token)
        except InvalidToken:
            logger.exception("Authentication error")
            return None
