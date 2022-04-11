# from django.apps import AppConfig


# class SwaggerConfig(AppConfig):
#     default_auto_field = 'django.db.models.BigAutoField'
#     name = 'swagger'

# TODO https://stackoverflow.com/questions/42907285/django-autoreload-add-watched-file
# apps.py
from django.apps import AppConfig
from django.utils.autoreload import autoreload_started
import os
from pathlib import Path

def my_watchdog(sender, **kwargs):
    watch = sender.extra_files.add
    # List of file paths to watch
    watch_list = [
        'swagger.yaml',
    ]
    for file in watch_list:
        if os.path.exists(file): # personal use case
            watch(Path(file))
    

class SwaggerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'swagger'

    def ready(self):
        autoreload_started.connect(my_watchdog)

# TODO https://stackoverflow.com/questions/6271719/reusing-django-code-auto-reload-functionality-for-custom-management-commands
# TODO https://adamtheautomator.com/yaml-to-json/
from django.utils import autoreload
from django.core.management.base import BaseCommand
## Import the modules to handle JSON & YAML
import yaml
import json

def do_something(*args, **kwargs):
    # management command 
    
    ## Create a variable to hold the data to import
    os_list = {}

    ## Read the YAML file
    # with open("c:\temp\operating-systems.yml") as infile:
    with open("swagger.yaml") as infile:
        # Marshall the YAML into the variable defined above
        os_list = yaml.load(infile, Loader=yaml.FullLoader)
        # Print the List to the console.
        print(os_list)
        # Open a file to write the JSON output. The 'w' makes the file writable
        # with open("c:\temp\python_operating-systems.json", 'w') as outfile:
        with open("static/swagger/swagger.json", 'w') as outfile:
            # Marshall the JSON, setting "indent" makes the file more readable
            json.dump(os_list, outfile, indent=4)
            print("JSON file written.")


class Command(BaseCommand):

    def handle(self, *args, **options):
        self.stdout('This command auto reloads. No need to restart...')
        autoreload.run_with_reloader(do_something, args=None, kwargs=None)
