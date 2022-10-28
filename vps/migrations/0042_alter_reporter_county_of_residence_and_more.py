# Generated by Django 4.0.3 on 2022-09-30 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vps', '0041_unregisteredreporter'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reporter',
            name='county_of_residence',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='reporter',
            name='phone_number',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='reporter',
            name='sub_county_of_residence',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]