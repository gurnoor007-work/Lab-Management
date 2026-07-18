from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework.response import Response

from ..models import Experiment, ChemistryDetails
from .serializers.serializers import CreateChemistryExperimentSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_chem_exp(request):
    serializer = CreateChemistryExperimentSerializer(
        data=request.data, context={"request": request}
    )


    serializer.is_valid(raise_exception=True)
    experiment = serializer.save()

    return Response({"id": experiment.id}, status=201)
