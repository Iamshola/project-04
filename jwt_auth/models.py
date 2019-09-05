# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
# Create your models here.

class User(AbstractUser):

    # custom fields here...
    image = models.CharField(max_length=200)

    # add this line... not sure what it does..
    objects = UserManager()
