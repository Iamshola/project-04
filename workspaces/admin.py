from django.contrib import admin
from jwt_auth.models import User
from .models import Workspace, Genre, Comment, Bookmark

# Register your models here.
admin.site.register(Workspace)
admin.site.register(Genre)
admin.site.register(Comment)
admin.site.register(Bookmark)
