from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from jwt_auth.models import User
from jwt_auth.serializers import UserSerializer
from .permissions import IsOwnerOrReadOnly

from .models import Workspace, Comment
from .serializers import WorkspaceSerializer, PopulatedUserSerializer, PopulatedWorkspaceSerializer, CommentSerializer

# Create your views here.
class WorkspaceList(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        workspaces = Workspace.objects.all()
        serializer = PopulatedWorkspaceSerializer(workspaces, many=True)
        return Response(serializer.data)

    def post(self, request):
        # deserialiser the data
        serializer = WorkspaceSerializer(data=request.data)
        if serializer.is_valid():
            # auto sets user to be logged in user
            serializer.save(user=request.user)
            serializer = PopulatedWorkspaceSerializer(serializer.instance)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)
class WorkspaceDetail(APIView):

    permission_classes = (IsOwnerOrReadOnly,)

    def get_workspace(self, pk):
        try:
            workspace = Workspace.objects.get(pk=pk)
        except Workspace.DoesNotExist:
            raise Http404

        return workspace

    def get(self, _request, pk):
        workspace = self.get_workspace(pk)

        serializer = PopulatedWorkspaceSerializer(workspace)
        return Response(serializer.data)

    def put(self, request, pk):
        workspace = self.get_workspace(pk)

        serializer = WorkspaceSerializer(workspace, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

    def delete(self, _request, pk):
        workspace = self.get_workspace(pk)
        workspace.delete()
        return Response(status=204)
class ProfileList(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        user = User.objects.all()
        serializer = PopulatedUserSerializer(user, many=True)
        return Response(serializer.data)

    def post(self, request):
        # deserialiser the data
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # auto sets user to be logged in user
            serializer.save()
            workspace = serializer.instance
            serializer = PopulatedUserSerializer(workspace)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)
class ProfileDetail(APIView):

    permission_classes = (IsOwnerOrReadOnly,)

    def get_workspace(self, pk):
        try:
            user = User.objects.get(pk=pk)
        except Workspace.DoesNotExist:
            raise Http404

        return user

    def get(self, _request, pk):
        user = self.get_workspace(pk)

        serializer = PopulatedUserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        user = self.get_workspace(pk)

        serializer = PopulatedUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class CommentList(APIView):
    def post(self, request, pk):
        # deserialiser the data
        workspace = Workspace.objects.get(pk=pk)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            # auto sets user to be logged in user
            serializer.save(workspace=workspace, user=request.user)
            serializer = PopulatedWorkspaceSerializer(workspace)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)


class CommentDetail(APIView):
    def get_comment(self, pk):
        try:
            comment = Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise Http404

        return comment

    def delete(self, _request, **kwargs):
        comment = self.get_comment(kwargs['pk'])
        comment.delete()
        return Response(status=204)
