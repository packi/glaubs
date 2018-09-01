from django.contrib import admin
from .models import Campaign, Committee, Envelopes, Person

admin.site.register(Campaign)
admin.site.register(Committee)
admin.site.register(Envelopes)
admin.site.register(Person)
