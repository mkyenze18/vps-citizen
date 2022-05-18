import os

# TODO https://docs.djangoproject.com/en/4.0/ref/models/fields/#django.db.models.FileField.upload_to
# def user_directory_path(instance, filename):
#     # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
#     return 'user_{0}/{1}'.format(instance.user.id, filename)

# def arrestee_mugshot_directory_path(arrestee, view, filename):
#     # file will be uploaded to MEDIA_ROOT/arrestee_<id>/<view>
#     root_ext = os.path.splitext(filename)
#     return 'arrestee_{0}/{1}'.format(arrestee.id, f'{view}%Y_%m_%d %H:%M:%S%z{root_ext[1]}')

def IPRS_person_mugshot_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/arrestee_<id>/<view>
    return 'iprs_person_{0}/{1}'.format(instance.id, filename)

def policeOfficer_mugshot_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/police_officer_<id>/<view>
    return 'police_officer_{0}/{1}'.format(instance.id, filename)

def arrestee_mugshot_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/arrestee_<id>/<view>
    return 'arrestee_{0}/{1}'.format(instance.arrestee.id, filename)

def arrestee_fingerprint_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/arrestee_<id>/<view>
    return 'arrestee_{0}/{1}'.format(instance.arrestee.id, filename)

def evidence_image_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/arrestee_<id>/<view>
    return 'evidence_{0}/{1}'.format(instance.arrestee.id, filename)