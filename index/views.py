from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.apps import apps

from settings.models import Setting
# Create your views here.

@login_required
def index(request):
    # apps.get_app_config('admin').verbose_name
    # apps_list = []
    # for app in apps:
    #     if app.get_app_config('admin')
    #     apps_list.appendapp()
    settings = Setting.objects.filter(user__isnull=True, configkey='enabled')
    app_settings = {}
    for setting in settings:
        enabled = False
        if setting.configvalue == 'on':
            enabled = True
        app_settings[setting.app] = enabled
    context = {
        'app_settings': app_settings
    }
    return render(request, 'index/index.html', context)