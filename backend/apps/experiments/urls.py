from django.urls import path
from .views.views_chem import create_chem_exp, get_chem_exp

urlpatterns = [
    path("chemistry/create/", create_chem_exp, name="create_chem_exp"),
    path("chemistry/get/<int:id>", get_chem_exp, name="get_chem_exp")
]
