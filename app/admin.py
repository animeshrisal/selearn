from django.contrib import admin
from .models import Category, Settings, Classroom, Lesson, Quiz, Question,  Comment

# Register your models here.
admin.site.register(Settings)
admin.site.register(Classroom)
admin.site.register(Lesson)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Comment)
admin.site.register(Category)
