# Generated by Django 3.2.6 on 2022-02-03 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0015_classroom_students'),
    ]

    operations = [
        migrations.AlterField(
            model_name='enrollment',
            name='completed_at',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='enrollment',
            name='enrolled_at',
            field=models.DateField(auto_now_add=True),
        ),
    ]