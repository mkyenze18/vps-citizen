# Generated by Django 4.0.3 on 2022-11-23 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vps', '0057_country_iso_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='country',
            name='iso_code',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]