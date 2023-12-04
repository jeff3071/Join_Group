# from django.db import models
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point

from users.models import User


# Create your models here.
class Group(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    group_name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group_type = models.CharField(null=True, max_length=100)
    starting_time = models.DateTimeField(null=True)
    ending_time = models.DateTimeField(null=True)
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)
    location = models.PointField(null=True)
    address = models.CharField(max_length=100)