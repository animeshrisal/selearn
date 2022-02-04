from django.db import IntegrityError
from django.shortcuts import render

from rest_framework import viewsets, generics, filters, status, mixins
from app import serializers

from app.models import Classroom, Enrollment, Lesson, UserLesson
from app.serializers import ClassroomSerializer, EnrollmentSerializer, LessonSerializer, UserLessonDetailSerializer, UserLessonSerializer
from rest_framework.response import Response

from .shared.helpers import StandardResultsSetPagination

from django.db import transaction

import traceback
import sys

from django.forms.models import model_to_dict
from datetime import date


from .queries import user_lesson_query, user_lesson_list_query

# Create your views here.


class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer
    pagination_class = StandardResultsSetPagination

    def list(self, request):
        queryset = self.queryset.filter(is_active=True).order_by('-created_at')
        page = self.paginate_queryset(queryset)
        serializer = ClassroomSerializer(page, many=True)
        result = self.get_paginated_response(serializer.data)
        return result

    def create(self, request):
        context = {'teacher': request.user}
        serializer = ClassroomSerializer(data=request.data, context=context)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LessonListCreateAPI(generics.ListCreateAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    pagination_class = StandardResultsSetPagination

    def list(self, request, pk):
        lesson = Lesson.objects.filter(classroom_id=pk)
        page = self.paginate_queryset(lesson)
        serializer = LessonSerializer(page, many=True)
        result = self.get_paginated_response(serializer.data)
        return result

    def create(self, request, pk):
        context = {'teacher': request.user, 'classroom_id': pk}
        serializer = LessonSerializer(data=request.data, context=context)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLessonListAPI(generics.ListAPIView):
    queryset = Lesson.objects.all()
    serializer_class = UserLessonSerializer
    pagination_class = StandardResultsSetPagination

    def list(self, request, pk):
        try:
            user_lesson_ids = tuple(Lesson.objects.filter(
                classroom_id=pk).values_list('id', flat=True))

            lesson_list = Lesson.objects.raw(user_lesson_list_query, params=[
                user_lesson_ids, request.user.id])

            page = self.paginate_queryset(lesson_list)
            serializer = UserLessonSerializer(page, many=True)
            result = self.get_paginated_response(serializer.data)

            return result
        except Exception as e:
            return Response({"error": "Could not load your lessons"}, status=status.HTTP_400_BAD_REQUEST)


class UserLessonRetrieveAPI(generics.RetrieveAPIView):
    serializer_class = LessonSerializer

    def retrieve(self, request, pk, lesson_pk):
        lesson = Lesson.objects.raw(user_lesson_query, params=[
                                    lesson_pk, request.user.id])[0]
        serializer = UserLessonDetailSerializer(lesson)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class EnrollStudentAPI(generics.CreateAPIView,  generics.RetrieveAPIView):
    serializer_class = EnrollmentSerializer

    def create(self, request, pk):
        try:
            with transaction.atomic():
                enrollment = Enrollment.objects.create(
                    user_id=request.user.id, classroom_id=pk)
                serializer = EnrollmentSerializer(enrollment)

                lesson_ids = list(Lesson.objects.filter(
                    classroom_id=pk).values_list('id', flat=True))

                user_lessons = []

                for lesson_id in lesson_ids:
                    user_lessons.append(UserLesson(
                        user_id=request.user.id,
                        lesson_id=lesson_id
                    ))

                UserLesson.objects.bulk_create(user_lessons)

                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({"error": "User is already enrolled"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            print(traceback.format_exc())
            return Response({"error": "Could not enroll user"}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        try:
            enrollment = Enrollment.objects.get(
                user_id=request.user.id, classroom_id=pk)
            serializer = EnrollmentSerializer(enrollment)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Enrollment.DoesNotExist:
            return Response({"enrolled": False}, status=status.HTTP_200_OK)


class CompleteLessonAPI(generics.UpdateAPIView):
    serializer_class = UserLessonSerializer

    def update(self, request, pk, lesson_pk):
        try:
            user_lesson = UserLesson.objects.get(
                user_id=request.user.id, lesson_id=lesson_pk)
            user_lesson.completed = True
            user_lesson.completed_at = date.today()
            user_lesson.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception:
            return Response({"error": "Could not complete lesson"})
