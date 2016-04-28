from django.db import models

class Municipality(models.Model):
    name = models.CharField(max_length=100, null=True)
    zip_code = models.IntegerField()
    bfs_number = models.IntegerField(null=True)
    main_municipality = models.BooleanField(default=False)
    address = models.TextField(null=True)
    phone_number = models.TextField(null=True)
    comment = models.TextField(null=True)
    political_municipality = models.ForeignKey('self', null=True)
    language = models.CharField(max_length=10, default='de')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)    
