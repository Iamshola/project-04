from django.contrib import admin
from jwt_auth.models import User
from .models import Workspace, Genre, Comment

# Register your models here.
admin.site.register(Workspace)
admin.site.register(Genre)
admin.site.register(Comment)
