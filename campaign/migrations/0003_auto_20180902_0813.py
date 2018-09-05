# Generated by Django 2.0.8 on 2018-09-02 08:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('campaign', '0002_auto_20180330_1934'),
    ]

    operations = [
        migrations.CreateModel(
            name='Envelopes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('offset_top_mm', models.IntegerField()),
                ('offset_left_mm', models.IntegerField()),
                ('active', models.BooleanField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.AddField(
            model_name='campaign',
            name='active',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='committee',
            name='active',
            field=models.BooleanField(default=None),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='committee',
            name='campaign',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.PROTECT, to='campaign.Campaign'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='person',
            name='active',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='person',
            name='committee',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.PROTECT, to='campaign.Committee'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='envelopes',
            name='campaign',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='campaign.Campaign'),
        ),
    ]