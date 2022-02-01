from ast import For
from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Settings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Classroom(models.Model):
    students = models.ManyToManyField(User, related_name='students')
    teacher = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='teacher')
    subject = models.CharField(max_length=200)
    description = models.TextField()


class Lesson(models.Model):
    classroom = models.ForeignKey(
        Classroom, on_delete=models.CASCADE, related_name='classroom')
    name = models.CharField()


class Quiz(models.Model):
    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name='quiz')


class Question(models.Model):
    first_question = models.CharField(max_length=200)
    second_question = models.CharField(max_length=200)
    third_question = models.CharField(max_length=200)
    fourth_question = models.CharField(max_length=200)
    answer = models.IntegerField()
    user_answer = models.ManyToManyField(User, through='UserAnswer')


class UserAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user_choice = models.IntegerField()


class Comment(models.Model):
    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name='lesson')
    comment = models.CharField(max_length=500)
    commenter = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='commentor')
