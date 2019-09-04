from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Workspace(models.Model):

    name = models.CharField(max_length=50)
    address_line_1 = models.CharField(max_length=50)
    address_line_2 = models.CharField(max_length=50)
    city = models.CharField(max_length=20)
    postcode = models.CharField(max_length=10)
    description = models.CharField(max_length=300)
    opening_times_mon = models.CharField(max_length=50)
    opening_times_tue = models.CharField(max_length=50)
    opening_times_wed = models.CharField(max_length=50)
    opening_times_thur = models.CharField(max_length=50)
    opening_times_fri = models.CharField(max_length=50)
    opening_times_sat = models.CharField(max_length=50)
    opening_times_sun = models.CharField(max_length=50)

    image = models.CharField(max_length=200)

    user = models.ForeignKey(User, related_name='movies', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name} - {self.city}'
