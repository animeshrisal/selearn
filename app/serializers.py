from urllib import request
from django.shortcuts import render
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Classroom, Comment, Lesson, User
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
    lesson = serializers.CharField()
    description = serializers.CharField()
    body = serializers.CharField()

    class Meta:
        model = Lesson
        fields = ('id', 'lesson', 'body')


class QuizSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField()
    quiz = serializers.CharField()


class QuestionSerializer(serializers.ModelSerializer):
    question = serializers.CharField()
    first_choice = serializers.CharField()
    second_choice = serializers.CharField()
    third_choice = serializers.CharField()
    fourth_choice = serializers.CharField()


class CommentSerializer(serializers.ModelSerializer):
    comment = serializers.CharField()
    created_at = serializers.DateTimeField()
