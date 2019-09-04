from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Workspace
from .serializers import WorkspaceSerializer

# Create your views here.
class WorkspaceList(APIView):

    def get(self, _request):
        workspaces = Workspace.objects.all()
        serializer = WorkspaceSerializer(workspaces, many=True)
        return Response(serializer.data)

    def post(self, request):
        # deserialiser the data
        serializer = WorkspaceSerializer(data=request.data)
        if serializer.is_valid():
            # auto sets user to be logged in user
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class WorkspaceDetail(APIView):


    def get_movie(self, pk):
        try:
            workspace = Workspace.objects.get(pk=pk)
        except Workspace.DoesNotExist:
            raise Http404

        return workspace

    def get(self, _request, pk):
        workspace = self.get_movie(pk)

        serializer = WorkspaceSerializer(workspace)
        return Response(serializer.data)

    def put(self, request, pk):
        workspace = self.get_movie(pk)

        serializer = WorkspaceSerializer(workspace, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

    def delete(self, _request, pk):
        workspace = self.get_movie(pk)
        workspace.delete()
        return Response(status=204)
