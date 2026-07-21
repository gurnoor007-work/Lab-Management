from rest_framework import serializers
from ...models import Experiment, ChemistryDetails


class CreateChemistryExperimentSerializer(serializers.Serializer):
    title = serializers.CharField()
    course = serializers.CharField()
    supervisor = serializers.CharField()
    date = serializers.DateField()
    lab_group = serializers.CharField(required=False)
    location = serializers.CharField(required=False)
    description = serializers.CharField(required=False)

    reaction = serializers.CharField()
    chemicals = serializers.JSONField()

    def create(self, validated_data):
        experiment = Experiment.objects.create(
            owner=self.context["request"].user,
            title=validated_data["title"],
            course=validated_data["course"],
            supervisor=validated_data["supervisor"],
            date=validated_data["date"],
            lab_group=validated_data.get("lab_group", ""),
            location=validated_data.get("location", ""),
            description=validated_data.get("description", ""),
        )

        ChemistryDetails.objects.create(
            experiment=experiment,
            reaction=validated_data["reaction"],
            chemicals=validated_data["chemicals"],
        )

        return experiment


class ChemistryDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChemistryDetails
        fields = "__all__"


class ChemistryExperimentSerializer(serializers.ModelSerializer):
    chemistry = ChemistryDetailsSerializer(read_only=True)

    class Meta:
        model = Experiment
        fields = "__all__"
