# Generated by Django 4.2.6 on 2023-11-05 13:03

from django.conf import settings
import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('group_name', models.CharField(max_length=100)),
                ('group_type', models.CharField(max_length=100, null=True)),
                ('starting_time', models.DateTimeField(null=True)),
                ('ending_time', models.DateTimeField(null=True)),
                ('latitude', models.FloatField(null=True)),
                ('longitude', models.FloatField(null=True)),
                ('location', django.contrib.gis.db.models.fields.PointField(null=True, srid=4326)),
                ('address', models.CharField(max_length=100)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]