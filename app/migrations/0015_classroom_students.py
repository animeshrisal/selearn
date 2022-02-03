# Generated by Django 3.2.6 on 2022-02-03 07:25

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0014_auto_20220203_0724'),
    ]

    operations = [
        migrations.AddField(
            model_name='classroom',
            name='students',
            field=models.ManyToManyField(blank=True, related_name='enrolled_students', through='app.Enrollment', to=settings.AUTH_USER_MODEL),
        ),
    ]