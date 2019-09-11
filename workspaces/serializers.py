from rest_framework import serializers
from jwt_auth.serializers import UserSerializer
from jwt_auth.models import User
from .models import Workspace, Genre, Comment

class WorkspaceSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Workspace
        fields = ('id', 'name', 'address_line_1', 'address_line_2', 'city', 'postcode', 'description', 'opening_times_mon', 'opening_times_tue', 'opening_times_wed', 'opening_times_thur',
        'opening_times_fri', 'opening_times_sat', 'opening_times_sun', 'image', 'link', 'user', 'genres', 'bookmarks', )


class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ('id', 'name', )

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    workspace = WorkspaceSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'content', 'user', 'created_at', 'workspace',)


class PopulatedWorkspaceSerializer(WorkspaceSerializer):
    genres = GenreSerializer(many=True)
    # bookmarks = BookmarkSerializer(many=True)
    comments = CommentSerializer(many=True, read_only=True)
    user = UserSerializer()

    class Meta(WorkspaceSerializer.Meta):
        fields = '__all__'

class PopulatedUserEditSerializer(serializers.ModelSerializer):
    workspaces = PopulatedWorkspaceSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'image', 'linked_In_Link', 'user_city', 'interest', 'workspaces',)

class PopulatedUserSerializer(UserSerializer):
    workspaces = PopulatedWorkspaceSerializer(many=True, read_only=True)

    class Meta(UserSerializer.Meta):
        fields = ('id', 'username', 'email', 'image', 'linked_In_Link', 'user_city', 'interest', 'workspaces',)
