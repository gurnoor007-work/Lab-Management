from django.urls import path


urlpatterns = [path("compile/<int:job_id>", compile, name="compile")]
