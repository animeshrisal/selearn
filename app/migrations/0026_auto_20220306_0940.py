# Generated by Django 3.2.6 on 2022-03-06 09:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0025_auto_20220303_1512'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='user_answer',
        ),
        migrations.DeleteModel(
            name='UserAnswer',
        ),
    ]
