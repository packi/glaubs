from django.db import models

class Municipality(models.Model):
    name = models.CharField(max_length=100, null=True)
    zip_code = models.IntegerField()
    address = models.TextField(null=True)
    phone_number = models.CharField(max_length=20, null=True)
    comment = models.TextField(null=True)
    political_municipality = models.ForeignKey('self', null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)    
