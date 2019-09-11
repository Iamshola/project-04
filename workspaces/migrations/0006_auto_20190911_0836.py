# Generated by Django 2.2.5 on 2019-09-11 08:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workspaces', '0005_workspace_bookmarks'),
    ]

    operations = [
        migrations.AddField(
            model_name='workspace',
            name='closing_times_fri',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='workspace',
            name='closing_times_mon',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='workspace',
            name='closing_times_sat',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='workspace',
            name='closing_times_sun',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='workspace',
            name='closing_times_thur',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='workspace',
            name='closing_times_tue',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='workspace',
            name='closing_times_wed',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='workspace',
            name='opening_times_fri',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='workspace',
            name='opening_times_mon',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='workspace',
            name='opening_times_sat',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='workspace',
            name='opening_times_sun',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='workspace',
            name='opening_times_thur',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='workspace',
            name='opening_times_tue',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='workspace',
            name='opening_times_wed',
            field=models.IntegerField(),
        ),
    ]