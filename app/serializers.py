from rest_framework import serializers
from .models import Category, Classroom, Comment, Lesson, Question, Quiz, User, UserLesson
from django.db import transaction
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema_field

# Create your views here.


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True)

    class Meta:
        ref_name = "User"
        model = User
        fields = ('id', 'username')


class CategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField()

    class Meta:
        model = Category
        fields = ('id', 'name')


class ClassroomSerializer(serializers.ModelSerializer):
    subject = serializers.CharField(required=True)
    description = serializers.CharField()
    banner = serializers.ImageField()
    teacher = UserSerializer(read_only=True)
    active_status = serializers.BooleanField()

    categories = CategorySerializer(read_only=True, many=True)

    def create(self, validated_data):
        classroom = Classroom.objects.create(
            subject=validated_data['subject'],
            description=validated_data['description'],
            banner=validated_data['banner'],
            teacher=self.context['teacher'],
            active_status=False
        )

        return classroom

    class Meta:
        model = Classroom
        fields = ('id', 'subject', 'description',
                  'banner', 'teacher', 'active_status', 'categories')


class LessonSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    description = serializers.CharField()
    body = serializers.CharField()
    order = serializers.IntegerField(read_only=True)
    previous = extend_schema_field(OpenApiTypes.INT)(
        serializers.PrimaryKeyRelatedField)(read_only=True)
    next = extend_schema_field(OpenApiTypes.INT)(
        serializers.PrimaryKeyRelatedField)(read_only=True)

    def create(self, validated_data):
        with transaction.atomic():
            classroom_lessons = Lesson.objects.filter(
                classroom_id=self.context['classroom_id'])

            total_lesson_count = classroom_lessons.count()

            prev_lesson_id = None

            if total_lesson_count > 0:
                prev_lesson = classroom_lessons.last()
                prev_lesson_id = prev_lesson.id

            lesson = Lesson.objects.create(
                name=validated_data['name'],
                description=validated_data['description'],
                body=validated_data['body'],
                classroom_id=self.context['classroom_id'],
                order=(total_lesson_count+1),
                previous_id=prev_lesson_id
            )

            if total_lesson_count > 0:
                prev_lesson.next_id = lesson.id
                prev_lesson.save()

        return lesson

    class Meta:
        model = Lesson
        fields = ('id', 'name', 'description',
                  'body', 'order', 'next', 'previous')


class UserLessonSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    description = serializers.CharField()
    order = serializers.IntegerField(read_only=True)
    completed = serializers.BooleanField()
    completed_at = serializers.DateField()
    order = serializers.IntegerField(read_only=True)
    previous = serializers.PrimaryKeyRelatedField(read_only=True)
    next = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        fields = ('id', 'name', 'description',
                  'body', 'order', 'next', 'previous')


class UserLessonDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    description = serializers.CharField()
    body = serializers.CharField()
    order = serializers.IntegerField(read_only=True)
    completed = serializers.BooleanField()
    completed_at = serializers.DateField()
    order = serializers.IntegerField(read_only=True)
    previous = extend_schema_field(OpenApiTypes.INT)(
        serializers.PrimaryKeyRelatedField)(read_only=True)
    next = extend_schema_field(OpenApiTypes.INT)(
        serializers.PrimaryKeyRelatedField)(read_only=True)

    class Meta:
        fields = ('__all__')


class EnrollmentSerializer(serializers.Serializer):
    enrolled_at = serializers.DateField(read_only=True)
    completed_at = serializers.DateField(read_only=True)
    enrolled = serializers.SerializerMethodField()

    def get_enrolled(self, obj):
        return True if obj.enrolled_at is not None else False

    class Meta:
        fields = ('__all__')


class QuizSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    name = serializers.CharField()
    state = serializers.IntegerField()

    def create(self, validated_data):
        quiz = Quiz.objects.create(
            name=validated_data['name'],
            classroom_id=self.context['classroom'],
        )

        return quiz

    class Meta:
        model = Quiz
        fields = ('id', 'name', 'created_at', 'state')


class QuestionSerializer(serializers.ModelSerializer):
    question = serializers.CharField()
    first_choice = serializers.CharField()
    second_choice = serializers.CharField()
    third_choice = serializers.CharField()
    fourth_choice = serializers.CharField()

    def create(self, validated_data):
        with transaction.atomic():

            quiz_questions = Question.objects.filter(
                quiz_id=self.context['quiz_pk']
            )

            total_question_count = question.count()

            prev_question_id = None

            if total_question_count > 0:
                prev_question = quiz_questions.last()
                prev_question_id = prev_question.id

            question = Question.objects.create(
                question=validated_data['question'],
                first_choice=validated_data['first_choice'],
                second_choice=validated_data['second_choice'],
                third_choice=validated_data['third_choice'],
                fourth_choice=validated_data['fourth_choice'],
                correct_choice=validated_data['correct_choice'],
                quiz_id=self.context['quiz_pk'],
                order=(total_question_count+1),
                previous_id=prev_question_id
            )

            if total_question_count > 0:
                prev_question.next_id = question.id
                prev_question.save()

        return question

    class Meta:
        model = Question
        fields = ('id', 'question', 'first_choice', 'second_choice',
                  'third_choice', 'fourth_choice', 'correct_choice', 'order', 'previous_id', 'next_id')


class CommentSerializer(serializers.ModelSerializer):
    comment = serializers.CharField()
    created_at = serializers.DateTimeField()

    class Meta:
        model = Comment
        fields = ('id', 'comment', 'created_at')


class UserCompletionSerializer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    lesson = serializers.PrimaryKeyRelatedField(read_only=True)
    completed_at = serializers.DateField()
    completed = serializers.BooleanField()

    class Meta:
        fields = '__all__'
