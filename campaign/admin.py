from django.contrib import admin
from .models import Campaign, Committee, Envelope, Person

admin.site.register(Campaign)
admin.site.register(Committee)
admin.site.register(Envelope)
admin.site.register(Person)
