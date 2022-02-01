from ast import For
from django.db import models
from django.contrib.auth.models import User

from app.shared.models import TimeStampedModel

# Create your models here.


class Settings(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Classroom(TimeStampedModel):
    students = models.ManyToManyField(User, related_name='students')
    teacher = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='teacher')
    subject = models.CharField(max_length=200)
    description = models.TextField()


class Lesson(TimeStampedModel):
    classroom = models.ForeignKey(
        Classroom, on_delete=models.CASCADE, related_name='classroom')
    name = models.CharField(max_length=200)


class Quiz(TimeStampedModel):
    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name='quiz_lesson')
    created_at = models
    name = models.CharField(max_length=200)


class Question(TimeStampedModel):
    question = models.CharField(max_length=200)
    first_choice = models.TextField()
    second_choice = models.TextField()
    third_choice = models.TextField()
    fourth_choice = models.TextField()
    correct_choice = models.IntegerField()

    user_answer = models.ManyToManyField(User, through='UserAnswer')


class UserAnswer(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user_choice = models.IntegerField()


class Comment(TimeStampedModel):
    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name='lesson')
    comment = models.CharField(max_length=500)
    commenter = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='commentor')
