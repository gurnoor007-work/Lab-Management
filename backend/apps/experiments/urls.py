from django.urls import path
from .views.views_chem import create_chem_exp, get_chem_exp
from .views.views_chem_edits import change_field

urlpatterns = [
    path("chemistry/create/", create_chem_exp, name="create_chem_exp"),
    path("chemistry/get/<int:id>", get_chem_exp, name="get_chem_exp"),
    path("chemistry/edit/<int:id>", change_field, name="change_field"),
]
