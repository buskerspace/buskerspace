from django.contrib import admin
from .models import User, Busker, Event, Following
admin.site.register(User)
admin.site.register(Busker)
admin.site.register(Event)
admin.site.register(Following)
