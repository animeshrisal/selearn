# Generated by Django 3.2.6 on 2022-02-01 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='answer',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='useranswer',
            name='user_choice',
            field=models.IntegerField(),
        ),
    ]
