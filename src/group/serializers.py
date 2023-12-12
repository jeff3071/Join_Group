from rest_framework import serializers
from .models import Group, Tag

class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = [
            'tag_name'
        ]

class GroupSerializer(serializers.ModelSerializer):
    group_tag = serializers.SerializerMethodField()

    def get_group_tag(self, obj):
        return list(obj.group_tag.values_list('tag_name', flat=True))

    class Meta:
        model = Group
        fields = [
            'id', 'user', 'starting_time', 'ending_time', 'group_tag',
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
        