from django.contrib import admin
from django.apps import apps

benchmark_models = apps.get_app_config('benchmark').get_models()

for model in benchmark_models:
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass
