# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

# Create your models here.

class User(AbstractUser):

    # custom fields here...
    image = models.CharField(max_length=200, blank=True)
    linked_In_Link = models.CharField(max_length=500, blank=True)
    user_city = models.CharField(max_length=60, blank=True)
    interest = models.CharField(max_length=60, blank=True)

    # add this line... not sure what it does..
    objects = UserManager()
