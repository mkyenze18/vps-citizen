# Generated by Django 4.0.3 on 2022-12-18 20:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vps', '0065_alter_occurrencecategoryinput_choices_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Inspection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('penal_code', models.CharField(blank=True, max_length=100)),
                ('occurrence', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='vps.occurrence')),
                ('police_officer', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='vps.policeofficer')),
            ],
        ),
        migrations.CreateModel(
            name='TrafficSubject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dl_expiry_date', models.DateTimeField()),
                ('inspection', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='vps.inspection')),
                ('iprs_person', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='vps.iprs_person')),
            ],
        ),
        migrations.CreateModel(
            name='UnregisteredTrafficSubject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_no', models.CharField(blank=True, max_length=100)),
                ('passport_no', models.CharField(blank=True, max_length=100)),
                ('first_name', models.CharField(max_length=100)),
                ('middle_name', models.CharField(blank=True, max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('county_of_birth', models.CharField(blank=True, max_length=30)),
                ('district_of_birth', models.CharField(blank=True, max_length=30)),
                ('division_of_birth', models.CharField(blank=True, max_length=30)),
                ('location_of_birth', models.CharField(blank=True, max_length=30)),
                ('date_of_birth', models.DateTimeField(blank=True, null=True)),
                ('dl_expiry_date', models.DateTimeField()),
                ('gender', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='vps.gender')),
                ('inspection', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='vps.inspection')),
                ('nationality', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='vps.country')),
            ],
        ),
        migrations.RemoveField(
            model_name='trafficoccurrence',
            name='Vehicle',
        ),
        migrations.RemoveField(
            model_name='trafficoccurrence',
            name='occurrence',
        ),
        migrations.RemoveField(
            model_name='trafficoffender',
            name='gender',
        ),
        migrations.RemoveField(
            model_name='trafficoffender',
            name='offence',
        ),
        migrations.RemoveField(
            model_name='vehicle',
            name='color',
        ),
        migrations.RemoveField(
            model_name='vehicle',
            name='organization',
        ),
        migrations.RemoveField(
            model_name='vehicle',
            name='vehicle_identification_no',
        ),
        migrations.AddField(
            model_name='vehicle',
            name='chassis_no',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='insurance_expiry_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.DeleteModel(
            name='Driver',
        ),
        migrations.DeleteModel(
            name='TrafficOccurrence',
        ),
        migrations.DeleteModel(
            name='TrafficOffender',
        ),
        migrations.AddField(
            model_name='inspection',
            name='vehicle',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='vps.vehicle'),
        ),
    ]