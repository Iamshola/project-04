from rest_framework import serializers
from jwt_auth.serializers import UserSerializer
from .models import Workspace, Genre, Comment, Bookmark

class WorkspaceSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Workspace
        fields = ('id', 'name', 'address_line_1', 'address_line_2', 'city', 'postcode', 'description', 'opening_times_mon', 'opening_times_tue', 'opening_times_wed', 'opening_times_thur',
        'opening_times_fri', 'opening_times_sat', 'opening_times_sun', 'image', 'link', 'user', 'bookmarks', 'genres', 'comments')


class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ('id', 'name', )

class BookmarkSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Bookmark
        fields = ('id', 'saved', 'user',)

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'title', 'content', 'user', )


class PopulatedWorkspaceSerializer(WorkspaceSerializer):
    genres = GenreSerializer(many=True)
    bookmarks = BookmarkSerializer(many=True)
    comments = CommentSerializer(many=True)
    user = UserSerializer()


class PopulatedUserSerializer(UserSerializer):
    workspaces = PopulatedWorkspaceSerializer(many=True)

    class Meta(UserSerializer.Meta):
        fields = ('id', 'username', 'email', 'image', 'linked_In_Link', 'user_city', 'interest', 'workspaces',)
