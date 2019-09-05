from rest_framework import serializers
from jwt_auth.serializers import UserSerializer
from .models import Workspace, Genre, Comment

class WorkspaceSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Workspace
        fields = ('id', 'name', 'address_line_1', 'address_line_2', 'city', 'postcode', 'description', 'opening_times_mon', 'opening_times_tue', 'opening_times_wed', 'opening_times_thur',
        'opening_times_fri', 'opening_times_sat', 'opening_times_sun', 'image', 'user', 'genres', 'comments')


class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ('id', 'name', )

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'title', 'content', 'user', )


class PopulatedWorkspaceSerializer(WorkspaceSerializer):
    genres = GenreSerializer(many=True)
    comments = CommentSerializer(many=True)
