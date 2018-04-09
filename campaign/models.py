from django.db import models


class Person(models.Model):
    full_name = models.CharField(max_length=100, null=True)
    signature_file = models.TextField(null=True, blank=True)
    phone_number = models.TextField(null=True, blank=True)

    active = models.BooleanField()

    committee = models.ForeignKey(
        'campaign.Committee', on_delete=models.PROTECT)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Committee(models.Model):
    name = models.TextField()
    address = models.TextField(null=True, blank=True)
    phone_number = models.TextField(null=True, blank=True)
    email = models.TextField(null=True, blank=True)

    active = models.BooleanField()

    campaign = models.ForeignKey(
        'campaign.Campaign', on_delete=models.PROTECT)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Campaign(models.Model):
    name = models.TextField()
    address = models.TextField(null=True, blank=True)
    phone_number = models.TextField(null=True, blank=True)
    email = models.TextField(null=True, blank=True)

    active = models.BooleanField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Envelopes(models.Model):
    name = models.TextField()
    offset_top_mm = models.IntegerField()
    offset_left_mm = models.IntegerField()

    active = models.BooleanField()

    campaign = models.ForeignKey(
        'campaign.Campaign', on_delete=models.PROTECT)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
