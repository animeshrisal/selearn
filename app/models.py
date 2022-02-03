from types import ClassMethodDescriptorType
from django.db import models
from django.contrib.auth.models import User

from app.shared.models import TimeStampedModel

# Create your models here.


class Settings(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Classroom(TimeStampedModel):
    students = models.ManyToManyField(User, related_name='enrolled_students', blank=True, through='Enrollment')
    teacher = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='teacher')
    subject = models.CharField(max_length=200)
    description = models.TextField()
    banner = models.ImageField(
        upload_to="banners", default="banners/default.png")

class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
    enrolled_at = models.DateField(blank=True)
    completed_at = models.DateField(blank=True)

class Lesson(TimeStampedModel):
    order = models.IntegerField()
    classroom = models.ForeignKey(
        Classroom, on_delete=models.CASCADE, related_name='classroom')
    user = models.ManyToManyField(User, through='UserLesson')
    name = models.CharField(max_length=200)
    description = models.TextField()
    body = models.TextField()

    class Meta:
        unique_together = (('id', 'order'))


class UserLesson(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    completed_at = models.DateField()

class Quiz(TimeStampedModel):
    classroom = models.ForeignKey(
        Classroom, on_delete=models.CASCADE, related_name='quiz')
    student = models.ManyToManyField(User, blank=True, through='UserQuiz')
    name = models.CharField(max_length=200)

class UserQuiz(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

class Question(TimeStampedModel):
    question = models.CharField(max_length=200)
    first_choice = models.TextField()
    second_choice = models.TextField()
    third_choice = models.TextField()
    fourth_choice = models.TextField()
    correct_choice = models.IntegerField()
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='quiz_question')

    user_answer = models.ManyToManyField(User, through='UserAnswer')


class UserAnswer(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user_choice = models.IntegerField(blank=True)


class Comment(TimeStampedModel):
    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name='lesson')
    comment = models.CharField(max_length=500)
    commenter = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='commentor')
