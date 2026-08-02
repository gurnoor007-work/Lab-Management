from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your models here.
class Experiment(models.Model):
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="user_experiment",
    )
    title = models.CharField(max_length=100, blank=True)
    course = models.CharField(max_length=200, blank=True)
    supervisor = models.CharField(max_length=200, blank=True)
    date = models.DateField(default=timezone.now)
    lab_group = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)

    status = models.CharField(
        max_length=20,
        choices=[
            ("draft", "Draft"),
            ("ongoing", "Ongoing"),
            ("completed", "Completed"),
        ],
        default="ongoing",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

def default_procedure():
    return {
        "title": "",
        "items": [],
        "updated_at": None,
    }

class ChemistryDetails(models.Model):
    experiment = models.OneToOneField(
        Experiment, on_delete=models.CASCADE, related_name="chemistry"
    )

    reaction = models.CharField(max_length=200)
    chemicals = models.JSONField(default=list)
    
    procedure = models.JSONField(default=default_procedure, blank=True)
    # {
    #     "title": "",
    #     "items": [],
    #     "updated_at": some_time,
    #     "status": status,
    # }
