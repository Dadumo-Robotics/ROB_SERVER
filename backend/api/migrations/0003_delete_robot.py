# Generated by Django 5.0.4 on 2024-05-28 22:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_delete_userrobot'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Robot',
        ),
    ]
