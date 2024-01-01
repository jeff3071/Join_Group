from rest_framework import serializers
from .models import Group, Tag

from django.contrib.auth import get_user_model

class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = [
            'tag_name'
        ]

class EmailUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("email",)

class GroupSerializer(serializers.ModelSerializer):
    group_tag = serializers.SerializerMethodField()
    user = EmailUserSerializer()

    def get_group_tag(self, obj):
        return list(obj.group_tag.values_list('tag_name', flat=True))
    
    def get_user(self, obj):
        user = obj.user
        return EmailUserSerializer(user).data

    class Meta:
        model = Group
        fields = [
            'id', 'user', 'starting_time', 'ending_time', 'group_tag',
            'address', 'latitude', 'longitude', 'location', 'group_description',
        ]


class NearbyGroupSerializer(GroupSerializer):

    distance = serializers.SerializerMethodField()

    def get_distance(self, instance):
        return instance.distance.mi if instance else 'N/A'

    class Meta:
        model = Group
        fields = [
            'id', 'user', 'starting_time', 'ending_time', 'group_tag',
            'address', 'latitude', 'longitude', 'location','group_description', 'distance',
        ]
        