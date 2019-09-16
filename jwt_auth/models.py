from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

class User(AbstractUser):

    image = models.CharField(max_length=200, blank=True)
    linked_In_Link = models.CharField(max_length=500, blank=True)
    user_city = models.CharField(max_length=60, blank=True)
    interest = models.CharField(max_length=600, blank=True)
    objects = UserManager()
