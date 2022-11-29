# Generated by Django 4.0.3 on 2022-11-28 17:08

from django.db import migrations, models
import helpers.upload_file_name


class Migration(migrations.Migration):

    dependencies = [
        ('vps', '0058_alter_country_iso_code'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='fingerprints',
            name='left_hand',
        ),
        migrations.RemoveField(
            model_name='fingerprints',
            name='right_hand',
        ),
        migrations.RemoveField(
            model_name='fingerprints',
            name='thumb',
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='left_index',
            field=models.FileField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='left_index_preview',
            field=models.ImageField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='left_little',
            field=models.FileField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='left_little_preview',
            field=models.ImageField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='left_middle',
            field=models.FileField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='left_middle_preview',
            field=models.ImageField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='left_ring',
            field=models.FileField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='left_ring_preview',
            field=models.ImageField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='left_thumb',
            field=models.FileField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='left_thumb_preview',
            field=models.ImageField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='right_index',
            field=models.FileField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='right_index_preview',
            field=models.ImageField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='right_little',
            field=models.FileField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='right_little_preview',
            field=models.ImageField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='right_middle',
            field=models.FileField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='right_middle_preview',
            field=models.ImageField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='right_ring',
            field=models.FileField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='right_ring_preview',
            field=models.ImageField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='right_thumb',
            field=models.FileField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
        migrations.AddField(
            model_name='fingerprints',
            name='right_thumb_preview',
            field=models.ImageField(blank=True, null=True, upload_to=helpers.upload_file_name.arrestee_fingerprint_directory_path),
        ),
    ]