# Generated by Django 2.2.5 on 2019-09-07 15:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workspaces', '0003_auto_20190906_1017'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workspace',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='workspaces', to=settings.AUTH_USER_MODEL),
        ),
    ]