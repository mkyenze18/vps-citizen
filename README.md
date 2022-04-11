# Virtual Police Station

_Powered by_ [![N|Solid](https://www.intelligentso.com/wp-content/uploads/2021/02/logo-white.png)](https://www.intelligentso.com/) 

[![Build Status](https://img.shields.io/badge/build-passing-green)](https://github.com/ingenious-dev/ie_vps)

Virtual Police Station is a utility designed to streamline the everyday operating procedures for police force allowing them to focus on the things that actually matter: law enforcement

## Features

- Police Officer onboarding
- Occurence book entry
- Evidence management
- Charge sheet generation

## Tech

Virtual Police Station uses a number of open source projects to work properly:

- [ReactJS] - Web app front-end framework
- [Django] - python framework for build web apps
- [Swagger] - REST API documentation using the OPEN API

## Development setup
To setup a dev environment for coding, clone the repository and then run `make dev-setup` to setup a virtual environment with the needed dependencies.

For testing, a docker container is included in the repository. To build and run the container make sure you have docker installed for your OS. Then build the docker container using this command:

```
make dev-build
```

Then start the container using this command, it will take over the current terminal you have open. The command will start the docker container giving you a bash shell and a user with the same ID as your user on the host. The root of this project will also be passed through to the container in the /home/user1/user1 folder. The container will get removed when you exit out of it, so you don't manually have to do it.

```
make dev-run
```

When you enter the container you will be placed in the /home/user1/user1 folder, to get started first install the python dependencies using poetry.

```
poetry install --no-dev --no-root
```

Now you can run the program either using:

```
poetry run python3 manage.py runserver 0.0.0.0:8000
```

Or by entering the virtualenv and then running the program. We bind the internal server to all interfaces so it can be easily access outside the docker container:
```
poetry shell

python3 manage.py runserver 0.0.0.0:8000
```


   [ReactJS]: <https://reactjs.org>
   [Django]: <https://www.djangoproject.com>
   [Swagger]: <https://swagger.io>


