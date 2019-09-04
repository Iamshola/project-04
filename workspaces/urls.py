from django.urls import path
from .views import WorkspaceList, WorkspaceDetail

urlpatterns = [
    path('workspaces/', WorkspaceList.as_view()),
    path('workspaces/<int:pk>/', WorkspaceDetail.as_view()),

]
