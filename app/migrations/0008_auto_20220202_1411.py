# Generated by Django 3.2.6 on 2022-02-02 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_alter_classroom_students'),
    ]

    operations = [
        migrations.AddField(
            model_name='lesson',
            name='body',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='lesson',
            name='description',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
    ]
