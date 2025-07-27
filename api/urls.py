from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NoteViewSet, TaskViewSet
from .views import register, login_view, user_info

router = DefaultRouter()
router.register(r'notes', NoteViewSet, basename='note')
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register),
    path('login/', login_view),
    path('user/', user_info),
]
