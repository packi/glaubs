from django.db import models
from django.conf import settings


class Person(models.Model):
    full_name = models.CharField(max_length=100, null=True)

    # not using ImageField here as we don't use its features
    signature_file = models.FileField(upload_to='signatures/')
    phone_number = models.CharField(max_length=20, null=True, blank=True)

    active = models.BooleanField()

    committee = models.ForeignKey(
        'campaign.Committee', on_delete=models.PROTECT)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )


class Committee(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField(null=True, blank=True)
    phone_number = models.TextField(null=True, blank=True)
    email = models.TextField(null=True, blank=True)

    active = models.BooleanField()

    campaign = models.ForeignKey(
        'campaign.Campaign', on_delete=models.PROTECT)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Campaign(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField(null=True, blank=True)
    phone_number = models.TextField(null=True, blank=True)
    email = models.TextField(null=True, blank=True)

    active = models.BooleanField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Envelope(models.Model):
    name = models.CharField(max_length=100)
    offset_top_mm = models.IntegerField()
    offset_left_mm = models.IntegerField()

    active = models.BooleanField()

    campaign = models.ForeignKey(
        'campaign.Campaign', on_delete=models.PROTECT)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
