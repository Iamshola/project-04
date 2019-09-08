from django.db import models
from jwt_auth.models import User


# Create your models here.
class Genre(models.Model):

    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.name}'

class Comment(models.Model):
    title = models.CharField(max_length=20)
    content = models.TextField()
    user = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.title} - {self.user}'

class Bookmark(models.Model):
    saved = models.BooleanField(default=True)
    user = models.ForeignKey(User, related_name='bookmarks', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user}'


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
    comments = models.ManyToManyField(Comment, related_name='workspaces', blank=True)
    bookmarks = models.ManyToManyField(Bookmark, related_name='workspaces', blank=True)

    def __str__(self):
        return f'{self.name} - {self.city}'
