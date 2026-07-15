from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
  email = models.EmailField(max_length=500, unique=True)
  role = models.CharField()

  USERNAME_FIELD = "email"
  REQUIRED_FIELDS = ["username"]
