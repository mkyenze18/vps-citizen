# Generated by Django 4.0.3 on 2022-10-28 23:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vps', '0046_alter_arrestee_cell_alter_arrestee_warrant'),
    ]

    operations = [
        migrations.AddField(
            model_name='arrestee',
            name='arresting_officer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='vps.policeofficer'),
        ),
    ]
