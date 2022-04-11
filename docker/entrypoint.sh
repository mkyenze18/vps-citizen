#!/bin/sh
set -eu

UID=${UID:-1000}
GID=${GID:-1000}

usermod -o -u "$UID" user1
groupmod -o -g "$GID" user1

exec su user1

poetry install --no-dev --no-root

poetry run python manage.py migrate

poetry run python manage.py runserver 0.0.0.0:8000