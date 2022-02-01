from django.shortcuts import render
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Comment, User
from django.db import transaction

# Create your views here.
class ClassroomSerializer(serializers.ModelSerializer):
    subject = serializers.CharField()
    description = serializers.CharField()

class LessonSerializer(serializers.ModelSerializer):
    lesson = serializers.CharField()

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

