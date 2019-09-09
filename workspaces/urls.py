from django.urls import path
from .views import WorkspaceList, WorkspaceDetail, ProfileDetail, ProfileList, CommentDetail, CommentList

urlpatterns = [
    path('workspaces/', WorkspaceList.as_view()),
    path('workspaces/<int:pk>/', WorkspaceDetail.as_view()),
    path('workspaces/<int:pk>/comments/', CommentList.as_view()),
    path('workspaces/<int:workspace_pk>/comments/<int:pk>/', CommentDetail.as_view()),
    path('users/', ProfileList.as_view()),
    path('users/<int:pk>/', ProfileDetail.as_view())

]
