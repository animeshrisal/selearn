from django.shortcuts import render

from rest_framework import viewsets, generics, filters, status
from app import serializers

from app.models import Classroom, Lesson
from app.serializers import ClassroomSerializer, LessonSerializer
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
        queryset = self.queryset.filter(classroom_id=pk).order_by('-created_at')
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
        queryset = Lesson.objects.filter(pk=lesson_pk)
        serializer = LessonSerializer(queryset)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
