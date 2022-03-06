"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    path('classroom/', views.ClassroomViewSet.as_view(
        {'get': 'list', 'post': 'create'}), name="classroom"),
    path('classroom/<int:pk>/',
         views.ClassroomViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name="classroom-detail"),
    path('classroom/<int:pk>/lesson',
         views.LessonListCreateAPI.as_view(), name="class_lesson"),
    path('classroom/<int:pk>/user_lesson',
         views.UserLessonListAPI.as_view(), name="user_lesson"),
    path('classroom/<int:pk>/lesson/<int:lesson_pk>',
         views.UserLessonRetrieveUpdateDestroyAPI.as_view(), name="lesson-detail"),

    path('classroom/<int:pk>/enroll',
         views.EnrollStudentAPI.as_view(), name="enroll"),
    path('classroom/<int:pk>/lesson/<int:lesson_pk>/complete',
         views.CompleteLessonAPI.as_view(), name="complete_lesson"),
    path('classroom/<int:pk>/quiz/',
         views.ClassroomQuizAPI.as_view({'get': 'list', 'post': 'create'}), name="quiz"),
    path('classroom/<int:pk>/quiz/<int:quiz_pk>',
         views.ClassroomQuizAPI.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name="quiz"),
    path('classroom/<int:classroom_pk>/quiz/<int:quiz_pk>/question/',
         views.QuizQuestionAPI.as_view({'get': 'list', 'post': 'create'}), name="quiz"),
    path('classroom/<int:classroom_pk>/quiz/<int:quiz_pk>/question/<int:pk>/',
         views.QuizQuestionAPI.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name="quiz"),

]
