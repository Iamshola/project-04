from django.db import models
from jwt_auth.models import User


# Create your models here.
class Genre(models.Model):

    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.name}'

class Workspace(models.Model):
    name = models.CharField(max_length=50)
    address_line_1 = models.CharField(max_length=50)
    address_line_2 = models.CharField(max_length=50)
    city = models.CharField(max_length=20)
    postcode = models.CharField(max_length=10)
    description = models.TextField()
    opening_times_mon = models.CharField(max_length=50)
    opening_times_tue = models.CharField(max_length=50)
    opening_times_wed = models.CharField(max_length=50)
    opening_times_thur = models.CharField(max_length=50)
    opening_times_fri = models.CharField(max_length=50)
    opening_times_sat = models.CharField(max_length=50)
    opening_times_sun = models.CharField(max_length=50)
    link = models.CharField(max_length=50)

    image = models.CharField(max_length=200, blank=True)
    user = models.ForeignKey(User, related_name='workspaces', on_delete=models.CASCADE, null=True)
    genres = models.ManyToManyField(Genre, related_name='workspaces', blank=True)
    # bookmark = models.ManyToManyField(User, related_name='workspaces_bo', blank=True)

    def __str__(self):
        return f'{self.name} - {self.city}'


class Comment(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    workspace = models.ForeignKey(Workspace, related_name='comments', on_delete=models.CASCADE)
