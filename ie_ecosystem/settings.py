"""
Django settings for ie_ecosystem project.
ie_ecosystem
Generated by 'django-admin startproject' using Django 4.0.3.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-v-_xl*8ubyv^p94sb#^nehtw45@#(eqwb*(87j*7yy9ojwq6w2'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost',
    'client.ingenious.or.ke',
    '192.168.1.55',
    '0.0.0.0'
]

# ? what is this
# TODO https://docs.djangoproject.com/en/4.0/ref/settings/#csrf-trusted-origins
CSRF_TRUSTED_ORIGINS = [
        'http://client.ingenious.or.ke:5059',
]

# Application definition

INSTALLED_APPS = [
    ## Added Apps 
    'crispy_forms',
    'rest_framework',
    'rest_framework.authtoken', # TODO https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication
    'corsheaders', # TODO https://pypi.org/project/django-cors-headers/
    'django_extensions',

    'swagger',
    'settings',
    'user',
    'index',
    'vps',
    'task_manager',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'vps.middleware.SimpleMiddleware', #  TODO https://docs.djangoproject.com/en/4.0/topics/http/middleware/#activating-middleware
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware', # TODO https://pypi.org/project/django-cors-headers/
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'ie_ecosystem.urls'

# TODO https://www.geeksforgeeks.org/how-to-use-glob-function-to-find-files-recursively-in-python/
# # Python program to demonstrate
# # glob using different wildcards
import glob
  
# print('Named explicitly:')
# for name in glob.glob('/home/geeks/Desktop/gfg/data.txt'):
#     print(name)
  
# # Using '*' pattern 
# print('\nNamed with wildcard *:')
# for name in glob.glob('/home/geeks/Desktop/gfg/*'):
#     print(name)
  
# # Using '?' pattern
# print('\nNamed with wildcard ?:')
# for name in glob.glob('/home/geeks/Desktop/gfg/data?.txt'):
#     print(name)
  
# # Using [0-9] pattern
# print('\nNamed with wildcard ranges:')
# for name in glob.glob('/home/geeks/Desktop/gfg/*[0-9].*'):
#     print(name)
# ./[vps]/react/build
template_path_array = [os.path.normpath(i) for i in glob.glob("./*/react")]
template_path = ''
if len(template_path_array):
    template_path = template_path_array[0]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [template_path, BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ie_ecosystem.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = 'static/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

MEDIA_URL ='/media/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# TODO https://www.django-rest-framework.org/#example
# REST_FRAMEWORK = {
#     # Use Django's standard `django.contrib.auth` permissions,
#     # or allow read-only access for unauthenticated users.
#     'DEFAULT_PERMISSION_CLASSES': [
#         'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
#     ]
# }

# TODO https://www.django-rest-framework.org/tutorial/5-relationships-and-hyperlinked-apis/#adding-pagination
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    # TODO https://www.django-rest-framework.org/api-guide/authentication/#setting-the-authentication-scheme
    'DEFAULT_AUTHENTICATION_CLASSES': [
        # 'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        # TODO https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication
        'rest_framework.authentication.TokenAuthentication',
    ]
}

CRISPY_TEMPLATE_PACK = 'bootstrap4'

LOGIN_REDIRECT_URL = "index:dashboard"

# TODO https://django-extensions.readthedocs.io/en/latest/graph_models.html#default-settings
# GRAPH_MODELS = {
#   'all_applications': True,
#   'group_models': True,
# }

GRAPH_MODELS = {
#   'app_labels': ["vps", "auth"],
  'app_labels': ["vps"],
}

# TODO https://docs.djangoproject.com/en/4.0/ref/settings/#staticfiles-dirs
# STATICFILES_DIRS = [
#     "/home/special.polls.com/polls/static",
#     "/home/polls.com/polls/static",
#     "/opt/webfiles/common",
# ]

# TODO https://stackoverflow.com/questions/60010487/python-glob-path-issue
# ./[vps]/rest_api/[v0]/static
static_path = [os.path.normpath(i) for i in glob.glob("./*/rest_api/*/static")]
# ./[vps]/public/static
static_path = [os.path.normpath(i) for i in glob.glob("./*/public/static")]
# ./[vps]/react/build
static_path = [os.path.normpath(i) for i in glob.glob("./*/react/build/static")]
# print(static_path)
STATICFILES_DIRS = static_path

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# TODO https://pypi.org/project/django-cors-headers/
CORS_ALLOWED_ORIGINS = [
#     "https://example.com",
#     "https://sub.example.com",
#     "http://localhost:8080",
#     "http://127.0.0.1:9000",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://client.ingenious.or.ke:5059",
]


from corsheaders.defaults import default_headers

CORS_ALLOW_HEADERS = list(default_headers) + [
    # "my-custom-header",

    # required from dropzone.js to work
    # Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
    "cache-control",

]

# TODO https://docs.djangoproject.com/en/4.0/topics/auth/default/#the-login-required-decorator
LOGIN_URL = "user:login"

# TODO https://docs.djangoproject.com/en/4.0/topics/email/#module-django.core.mail
EMAIL_HOST = "mail.ingenious.or.ke"
EMAIL_PORT = 465
EMAIL_HOST_USER = "noreply-ie@ingenious.or.ke"
EMAIL_HOST_PASSWORD = "v~M2J[qc!,4W"

# EMAIL_USE_TLS = True
EMAIL_USE_SSL = True
