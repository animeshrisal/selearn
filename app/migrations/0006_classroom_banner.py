# Generated by Django 3.2.6 on 2022-02-02 03:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_auto_20220201_1205'),
    ]

    operations = [
        migrations.AddField(
            model_name='classroom',
            name='banner',
            field=models.ImageField(default='banners/default.png', upload_to='banners'),
        ),
    ]
