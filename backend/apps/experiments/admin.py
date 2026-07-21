from django.contrib import admin
from .models import Experiment, ChemistryDetails


# Register your models here.
@admin.register(Experiment)
class ExperimentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "owner",
        "title",
        "course",
        "supervisor",
        "date",
        "lab_group",
        "location",
        "description",
        "status",
        "created_at",
        "updated_at",
    )
    search_fields = ("=id", "title", "course", "date")


@admin.register(ChemistryDetails)
class ChemistryExperimentAdmin(admin.ModelAdmin):
    list_display = (
        "experiment",
        "reaction",
        "chemicals",
    )
    search_fields = ("reaction",)
