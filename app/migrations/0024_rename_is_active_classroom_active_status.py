# Generated by Django 3.2.6 on 2022-03-01 09:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0023_annoucement'),
    ]

    operations = [
        migrations.RenameField(
            model_name='classroom',
            old_name='is_active',
            new_name='active_status',
        ),
    ]
