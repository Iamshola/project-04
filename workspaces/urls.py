from django.urls import path
from .views import WorkspaceList, WorkspaceDetail, ProfileDetail, ProfileList, CommentDetail, CommentList, BookmarkList

urlpatterns = [
    path('workspaces/', WorkspaceList.as_view()),
    path('workspaces/<int:pk>/', WorkspaceDetail.as_view()),
    path('users/', ProfileList.as_view()),
    path('users/<int:pk>/', ProfileDetail.as_view()),
    path('comments/<int:pk>/', CommentDetail.as_view()),
    path('comments/', CommentList.as_view()),
    path('comments/<int:pk>/', CommentDetail.as_view()),
    path('workspaces/<int:pk>/bookmark/', BookmarkList.as_view())

]
