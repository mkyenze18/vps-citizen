# Generated by Django 4.0.3 on 2022-12-18 21:04

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('vps', '0067_rename_vehicle_reg_no_vehicle_reg_no'),
    ]

    operations = [
        migrations.AddField(
            model_name='inspection',
            name='date_modified',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='inspection',
            name='date_posted',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]