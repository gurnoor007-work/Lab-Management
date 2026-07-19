from ..utils.cookies import set_auth_cookies, clear_auth_cookies

from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework.exceptions import AuthenticationFailed

from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .serializers.serializers import RegisterUserSerializer, UserSerializer

import logging

logger = logging.getLogger(__name__)


# Register View
@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    data = request.data

    serializer = RegisterUserSerializer(data=data)
    serializer.is_valid(raise_exception=True)

    try:
        user = serializer.save()
        refresh_token = RefreshToken.for_user(user=user)
        access_token = refresh_token.access_token

        res = Response(
            {"message": "User created successfully", "success": True},
            status=status.HTTP_201_CREATED,
        )
        logger.info("User %s registered", user.email)

        set_auth_cookies(res, access_token, refresh_token)
        return res
    except Exception:
        logger.exception("Register User error")
        return Response(
            {"message": "Register Failed", "success": False},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# Login View
class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens["access"]
            refresh_token = tokens["refresh"]

            res = Response(
                {"message": "Login Successful", "success": True},
                status=status.HTTP_200_OK,
            )
            logger.info("User %s logged in", request.data.get("email"))

            set_auth_cookies(res, access_token, refresh_token)
            return res
        except AuthenticationFailed:
            return Response(
                {"message": "Invalid email or password", "success": False},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        except Exception:
            logger.exception("Log in failed")
            return Response(
                {"message": "Login View", "success": False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# Refresh Token View
class RefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get("refresh_token")
            request.data["refresh"] = refresh_token

            response = super().post(request, *args, **kwargs)
            tokens = response.data
            logger.info("Gurnoor tokens: ", response.data)

            access_token = tokens["access"]
            refresh_token = request.COOKIES.get("refresh_token")

            res = Response(
                {"message": "Token Refresh Successful", "success": True},
                status=status.HTTP_200_OK,
            )
            res.data = {"refresh": True}
            logger.info("Tokens refreshed for %s", request.user.username)

            set_auth_cookies(res, access_token, refresh_token)
            return res
        except Exception as e:
            logger.exception("Token Refresh Failed")
            return Response(
                {"message": "Token Refresh Failed", "success": False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# Logout View
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        res = Response(
            {
                "message": f"Logout Successful for user: {request.user.username}",
                "success": True,
            },
            status=status.HTTP_200_OK,
        )
        # blacklisting the refresh token
        refresh_token = request.COOKIES.get("refresh_token")
        token = RefreshToken(refresh_token)
        token.blacklist()

        clear_auth_cookies(res)
        return res
    except Exception as e:
        logger.exception("Logout failed for %s", request.user.username)
        return Response(
            {"message": "Logout Failed", "success": False},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# User fetch view
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def fetch_user(request):
    serializer = UserSerializer(request.user)
    logger.info("Sending user info for %s", request.user.username)
    return Response(
        {"user_data": serializer.data, "success": True}, status=status.HTTP_200_OK
    )


# View to check authenticated or not
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    logger.info("User %s is authenticated", request.user.username)
    return Response(
        {"message": "User Authenticated", "success": True}, status=status.HTTP_200_OK
    )
