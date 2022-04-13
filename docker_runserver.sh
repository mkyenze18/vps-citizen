poetry install --no-dev --no-root

poetry run python manage.py migrate

poetry run python manage.py runserver 0.0.0.0:8000

# TODO https://django-extensions.readthedocs.io/en/latest/runserver_plus.html#getting-started
# poetry run python manage.py runserver_plus 0.0.0.0:8000
# TODO https://django-extensions.readthedocs.io/en/latest/runserver_plus.html#ssl
# poetry run python manage.py runserver_plus 0.0.0.0:8000 --cert-file cert.crt
# poetry run python manage.py runserver_plus 0.0.0.0:8000 --cert-file fullchain.pem --key-file privkey.pem # https://timonweb.com/django/https-django-development-server-ssl-certificate/