# Generated by Django 2.2.5 on 2019-09-05 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workspaces', '0005_auto_20190904_1600'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workspace',
            name='description',
            field=models.TextField(),
        ),
    ]
