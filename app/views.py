from django.db import IntegrityError

from rest_framework import viewsets, generics,  status
from app import serializers

from app.models import Classroom, Enrollment, Lesson, Question, Quiz, UserLesson
from app.serializers import ClassroomSerializer, EnrollmentSerializer, LessonSerializer, QuestionSerializer, QuizSerializer, UserLessonDetailSerializer, UserLessonSerializer
from rest_framework.response import Response

from .shared.helpers import StandardResultsSetPagination

from django.db import transaction

import traceback

from .queries import user_lesson_query, user_lesson_list_query

# Create your views here.


class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer
    pagination_class = StandardResultsSetPagination

    def list(self, request):
        queryset = self.queryset.filter(
            active_status=True).order_by('-created_at')
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
    serializer_class = UserLessonSerializer
    pagination_class = StandardResultsSetPagination

    def list(self, request, pk,):
        try:
            lesson_list = Lesson.objects.raw(user_lesson_list_query, params=[
                pk])

            page = self.paginate_queryset(lesson_list)
            serializer = UserLessonSerializer(page, many=True)
            result = self.get_paginated_response(serializer.data)

            return result
        except Exception as e:
            print(e)
            return Response({"error": "Could not load your lessons"}, status=status.HTTP_400_BAD_REQUEST)


class UserLessonRetrieveUpdateDestroyAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LessonSerializer

    def retrieve(self, request, pk, lesson_pk):
        lesson = Lesson.objects.raw(user_lesson_query, params=[
                                    lesson_pk])[0]
        serializer = UserLessonDetailSerializer(lesson)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk, lesson_pk):
        lesson = Lesson.objects.get(pk=lesson_pk)
        serializer = LessonSerializer(lesson, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EnrollStudentAPI(generics.CreateAPIView,  generics.RetrieveAPIView):
    serializer_class = EnrollmentSerializer

    def create(self, request, pk):
        try:
            with transaction.atomic():
                enrollment = Enrollment.objects.create(
                    user_id=request.user.id, classroom_id=pk)
                serializer = EnrollmentSerializer(enrollment)

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


class CompleteLessonAPI(generics.CreateAPIView):
    def post(self, request, classroom_pk, pk):
        try:
            UserLesson.objects.create(
                user_id=request.user.id,
                lesson_id=pk,
                completed=True
            )
            return Response(status=status.HTTP_204_NO_CONTENT)
        except IntegrityError:
            return Response({"error": "You have already completed this lesson"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Could not complete lesson"}, status=status.HTTP_400_BAD_REQUEST)


class ClassroomQuizAPI(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    pagination_class = StandardResultsSetPagination

    def list(self, request, classroom_pk):
        queryset = self.queryset.filter(
            classroom_id=classroom_pk).order_by('-created_at')
        page = self.paginate_queryset(queryset)
        serializer = QuizSerializer(page, many=True)
        result = self.get_paginated_response(serializer.data)
        return result

    def retrieve(self, request, classroom_pk, pk):
        question = Quiz.objects.get(classroom_id=classroom_pk, id=pk)
        serializer = QuizSerializer(question)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, classroom_pk):
        context = {'classroom': classroom_pk}
        serializer = QuizSerializer(data=request.data, context=context)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuizQuestionAPI(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    pagination_class = StandardResultsSetPagination

    def list(self, request, classroom_pk, quiz_pk):
        queryset = self.queryset.filter(
            quiz_id=quiz_pk).order_by('-created_at')
        page = self.paginate_queryset(queryset)
        serializer = QuestionSerializer(page, many=True)
        result = self.get_paginated_response(serializer.data)
        return result

    def retrieve(self, request, classroom_pk, quiz_pk, pk):
        question = Question.objects.get(id=pk, quiz_id=quiz_pk)
        serializer = QuestionSerializer(question)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, classroom_pk, quiz_pk):
        context = {'classroom': classroom_pk, 'quiz_pk': quiz_pk}
        serializer = QuestionSerializer(data=request.data, context=context)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SetQuizAsActiveAPI(generics.UpdateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    pagination_class = StandardResultsSetPagination

    def update(self, request, classroom_pk, pk):
        quiz = Quiz.objects.get(classroom_id=classroom_pk, pk=pk)
        quiz.state = 1
        quiz.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class SetQuizAsArchivedAPI(generics.UpdateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    pagination_class = StandardResultsSetPagination

    def update(self, request, classroom_pk, pk):
        quiz = Quiz.objects.get(classroom_id=classroom_pk, pk=pk)
        quiz.state = 2
        quiz.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

class StudentClassroomQuizAPI(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    pagination_class = StandardResultsSetPagination

    def list(self, request, classroom_pk):
        queryset = self.queryset.filter(
            classroom_id=classroom_pk, state = 1).order_by('-created_at')
        page = self.paginate_queryset(queryset)
        serializer = QuizSerializer(page, many=True)
        result = self.get_paginated_response(serializer.data)
        return result
