# Generated by Django 4.0.3 on 2022-07-01 03:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vps', '0024_rename_model_evidenceitemcategory_item_models_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='evidenceitemcategory',
            old_name='unit',
            new_name='units',
        ),
    ]
