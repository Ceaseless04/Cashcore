# Generated by Django 5.1.3 on 2024-11-19 02:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restfulapi', '0003_testusermodel_remove_customuser_userid_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='TestUserModel',
        ),
    ]
