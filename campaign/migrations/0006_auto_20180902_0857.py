# Generated by Django 2.0.8 on 2018-09-02 08:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaign', '0005_auto_20180902_0852'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='phone_number',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
