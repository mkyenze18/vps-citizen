# Generated by Django 4.0.3 on 2023-01-17 16:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vps', '0069_alter_trafficsubject_dl_expiry_date_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='InsurancePolicy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('certificate_no', models.CharField(max_length=50)),
                ('certificate_type', models.CharField(max_length=50)),
                ('reg_no', models.CharField(max_length=50)),
                ('insurer', models.CharField(max_length=50)),
                ('policy_no', models.CharField(max_length=50)),
                ('date_start', models.DateTimeField()),
                ('date_end', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='RegisteredVehicle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reg_no', models.CharField(max_length=50)),
                ('chassis_no', models.CharField(blank=True, max_length=50)),
                ('engine_no', models.CharField(max_length=50)),
                ('make', models.CharField(max_length=50)),
                ('model', models.CharField(max_length=50)),
                ('year_of_manufacture', models.IntegerField()),
                ('licensed_to_carry', models.BooleanField(blank=True, null=True)),
                ('tonnage', models.IntegerField(blank=True, null=True)),
            ],
        ),
    ]
