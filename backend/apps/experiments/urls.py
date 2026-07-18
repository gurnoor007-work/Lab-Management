from django.urls import path
from .views.experiment_views import create_chem_exp

urlpatterns = [
    path("chemistry/create/", create_chem_exp, name="create_chem_exp"),
]
