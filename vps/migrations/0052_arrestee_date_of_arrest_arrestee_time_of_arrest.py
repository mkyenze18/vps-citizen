# Generated by Django 4.0.3 on 2022-11-04 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vps', '0051_alter_next_of_kin_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='arrestee',
            name='date_of_arrest',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='arrestee',
            name='time_of_arrest',
            field=models.TimeField(blank=True, null=True),
        ),
    ]