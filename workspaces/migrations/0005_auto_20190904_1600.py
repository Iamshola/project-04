# Generated by Django 2.2.5 on 2019-09-04 16:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workspaces', '0004_auto_20190904_1554'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Category',
            new_name='Genre',
        ),
        migrations.RenameField(
            model_name='workspace',
            old_name='categorys',
            new_name='genres',
        ),
    ]
