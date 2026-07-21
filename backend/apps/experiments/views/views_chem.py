from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated, AllowAny

from django.forms.models import model_to_dict

from rest_framework.response import Response
from rest_framework import status

from ..models import Experiment, ChemistryDetails
from .serializers.serializers_chem import (
    CreateChemistryExperimentSerializer,
    ChemistryExperimentSerializer,
)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_chem_exp(request):
    serializer = CreateChemistryExperimentSerializer(
        data=request.data, context={"request": request}
    )

    serializer.is_valid(raise_exception=True)
    experiment = serializer.save()

    return Response(
        {
            "id": experiment.id,
            "message": "Experiment created successfully",
            "success": True,
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_chem_exp(request, id):
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

    serializer = ChemistryExperimentSerializer(experiment)

    return Response(
        {
            "success": True,
            "data": serializer.data,
        },
        status=status.HTTP_200_OK,
    )
