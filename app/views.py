from django.db import IntegrityError
from django.shortcuts import render

from rest_framework import viewsets, generics, filters, status, mixins
from app import serializers

from app.models import Classroom, Enrollment, Lesson
from app.serializers import ClassroomSerializer, EnrollmentSerializer, LessonSerializer
from rest_framework.response import Response

from .shared.helpers import StandardResultsSetPagination

# Create your views here.


class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer
    pagination_class = StandardResultsSetPagination

    def list(self, request):
        queryset = self.queryset.order_by('-created_at')
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
        queryset = self.queryset.filter(classroom_id=pk).order_by('order')
        page = self.paginate_queryset(queryset)
        serializer = LessonSerializer(page, many=True)
        result = self.get_paginated_response(serializer.data)
        return result

    def create(self, request, pk):
        context = {'teacher': request.user}
        serializer = LessonSerializer(data=request.data, context=context)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LessonRetrieveAPI(generics.RetrieveAPIView):
    serializer_class = LessonSerializer

    def retrieve(self, request, pk, lesson_pk):
        queryset = Lesson.objects.get(pk=lesson_pk)
        serializer = LessonSerializer(queryset)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class EnrollStudentAPI(generics.CreateAPIView,  generics.RetrieveAPIView):
    serializer_class = EnrollmentSerializer

    def create(self, request, pk):
        try:
            enrollment = Enrollment.objects.create(
                user_id=request.user.id, classroom_id=pk)
            serializer = EnrollmentSerializer(enrollment)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({"error": "User is already enrolled"}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        try:
            enrollment = Enrollment.objects.get(
                user_id=request.user.id, classroom_id=pk)
            serializer = EnrollmentSerializer(enrollment)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Enrollment.DoesNotExist:
            return Response({"enrolled": False}, status=status.HTTP_200_OK)

class GetStudentEnrollmentStatusAPI(generics.RetrieveAPIView):
    serializer_class = EnrollmentSerializer


