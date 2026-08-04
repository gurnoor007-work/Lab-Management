from rest_framework import serializers
from ...models import Experiment, ChemistryDetails
from django.utils import timezone


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


class ExperimentSerializer(serializers.ModelSerializer):
    chemistry = ChemistryDetailsSerializer()

    class Meta:
        model = Experiment
        fields = "__all__"
        read_only_fields = (
            "id",
            "owner",
            "created_at",
            "updated_at",
        )

    def update(self, instance, validated_data):
        chemistry_data = validated_data.pop("chemistry", None)

        # Update Experiment fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        # Update ChemistryDetails
        if chemistry_data:
            chemistry = instance.chemistry

            for attr, value in chemistry_data.items():

                # Handle JSONField partial updates
                if attr == "procedure" and isinstance(value, dict):
                    current_procedure = chemistry.procedure or {}

                    current_procedure.update(value)

                    current_procedure["updated_at"] = timezone.now().isoformat()

                    setattr(chemistry, "procedure", current_procedure)

                else:
                    setattr(chemistry, attr, value)

            chemistry.save()

        return instance