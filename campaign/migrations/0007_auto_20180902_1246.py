# Generated by Django 2.0.8 on 2018-09-02 12:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('campaign', '0006_auto_20180902_0857'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Envelopes',
            new_name='Envelope',
        ),
    ]