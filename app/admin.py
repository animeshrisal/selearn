from django.contrib import admin
from .models import Settings, Classroom, Lesson, Quiz, Question, UserAnswer, Comment

# Register your models here.
admin.site.register(Settings)
admin.site.register(Classroom)
admin.site.register(Lesson)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(UserAnswer)
admin.site.register(Comment)

