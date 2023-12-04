from rest_framework import serializers
from .models import Group

class GroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group
        fields = [
            'id', 'user', 'starting_time', 'ending_time', 'group_type',
            'address', 'latitude', 'longitude', 'location'
        ]


class NearbyGroupSerializer(GroupSerializer):

    distance = serializers.SerializerMethodField()

    def get_distance(self, instance):
        return instance.distance.mi if instance else 'N/A'

    class Meta:
        model = Group
        fields = [
            'id', 'user', 'starting_time', 'ending_time', 'group_type',
            'address', 'latitude', 'longitude', 'location', 'distance',
        ]