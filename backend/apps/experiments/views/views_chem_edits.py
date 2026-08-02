from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework.response import Response
from rest_framework import status

from ..models import Experiment
from .serializers.serializers_chem import (
    ExperimentSerializer,
)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def change_field(request, id):
    try:
        experiment = Experiment.objects.get(id=id)
    except Experiment.DoesNotExist:
        return Response(
            {"message": "No such experiment found", "success": False},
            status=status.HTTP_404_NOT_FOUND,
        )

    if request.user != experiment.owner:
        return Response(
            {"message": "Access Denied", "success": False},
            status=status.HTTP_403_FORBIDDEN,
        )

    serializer = ExperimentSerializer(
        experiment,
        data=request.data,
        partial=True,
    )

    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(
        {
            "success": True,
            "message": "Experiment updated successfully",
            "data": serializer.data,
        },
        status=status.HTTP_200_OK,
    )