from asyncore import read
from urllib import request
from django.shortcuts import render
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Classroom, Comment, Lesson, Question, Quiz, User
from django.db import transaction

# Create your views here.


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True)

    class Meta:
        ref_name = "User"
        model = User
        fields = ('id', 'username')

class ClassroomSerializer(serializers.ModelSerializer):
    subject = serializers.CharField(required=True)
    description = serializers.CharField()
    banner = serializers.ImageField()
    teacher = UserSerializer(read_only=True)

    def create(self, validated_data):
        classroom = Classroom.objects.create(
            subject=validated_data['subject'],
            description=validated_data['description'],
            banner=validated_data['banner'],
            teacher=self.context['teacher']
        )

        return classroom

    class Meta:
        model = Classroom
        fields = ('id', 'subject', 'description', 'banner', 'teacher')

class LessonSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    description = serializers.CharField()
    body = serializers.CharField()
    order = serializers.IntegerField()

    def create(self, validated_data):
        classroom = Lesson.objects.create(
            name=validated_data['name'],
            description=validated_data['description'],
            body=validated_data['body'],
            classroom=self.context['classroom']
        )

        return classroom

    class Meta:
        model = Lesson
        fields = ('id', 'name', 'description', 'body', 'order')

class EnrollmentSerializer(serializers.Serializer):
    enrolled_at = serializers.DateField(read_only=True)
    completed_at = serializers.DateField(read_only=True)
    enrolled = serializers.SerializerMethodField()

    def get_enrolled(self, obj):
        return True if obj.enrolled_at is not None else False

    class Meta:
        fields = '__all__'

class QuizSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField()
    name = serializers.CharField()
    
    class Meta:
        model = Quiz
        fields = ('id', 'name', 'created_at')

class QuestionSerializer(serializers.ModelSerializer):
    question = serializers.CharField()
    first_choice = serializers.CharField()
    second_choice = serializers.CharField()
    third_choice = serializers.CharField()
    fourth_choice = serializers.CharField()

    class Meta:
        model = Question
        fields = ('id', 'question', 'first_choice', 'third_choice', 'fourth_choice')


class CommentSerializer(serializers.ModelSerializer):
    comment = serializers.CharField()
    created_at = serializers.DateTimeField()

    class Meta:
        model = Comment
        fields = ('id', 'comment', 'created_at')
