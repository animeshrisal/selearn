# Generated by Django 3.2.6 on 2022-02-03 01:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0011_auto_20220202_1552'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='quiz',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='quiz_question', to='app.quiz'),
            preserve_default=False,
        ),
    ]
