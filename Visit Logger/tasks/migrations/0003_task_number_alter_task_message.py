# Generated by Django 4.0.5 on 2022-07-03 02:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0002_rename_title_task_message_remove_task_completed_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='number',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='task',
            name='message',
            field=models.CharField(default='', max_length=100),
        ),
    ]