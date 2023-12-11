from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.contrib.gis.geos import Point
from rest_framework import status
from users.models import User

from .services import get_nearby_group_within
from .models import Group, Tag
from .serializers import GroupSerializer, NearbyGroupSerializer


class GroupView(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'latitude': openapi.Schema(type=openapi.TYPE_NUMBER),
                'longitude': openapi.Schema(type=openapi.TYPE_NUMBER)
            }
        ),
        responses={200: GroupSerializer}
    )
    def list(self, request):
        latitude= request.data['latitude']
        longitude = request.data['longitude']
        
        radius = 10
        number_of_groups_to_return = 100

        groups = get_nearby_group_within(
            latitude=float(latitude),
            longitude=float(longitude),
            km=radius,
            limit=number_of_groups_to_return
        )

        groups_data = NearbyGroupSerializer(groups, many=True)
        return Response(groups_data.data)
    
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'group_id': openapi.Schema(type=openapi.TYPE_INTEGER)
            }
        ),
        responses={200: GroupSerializer}
    )
    def post(self, request):
        group_id = request.data.get('group_id')
        group = Group.objects.get(id=group_id)
        group_data = GroupSerializer(group)
        return Response(group_data.data)
    
    def update(self, request):
        group_id = request.data.get('group_id')
        group = Group.objects.get(id=group_id)
        serializer = GroupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    
class CreateGroupView(GenericAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING),
                'latitude': openapi.Schema(type=openapi.TYPE_NUMBER),
                'longitude': openapi.Schema(type=openapi.TYPE_NUMBER),
                'group_name': openapi.Schema(type=openapi.TYPE_STRING),
                'group_tag': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(type=openapi.TYPE_STRING),
                ),
                'starting_time': openapi.Schema(type=openapi.TYPE_STRING),
                'ending_time': openapi.Schema(type=openapi.TYPE_STRING),
                'address': openapi.Schema(type=openapi.TYPE_STRING),
            }
        ),
        responses={200: GroupSerializer}
    )
    def post(self, request):
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')
        try:
            name = request.data.get('name')
            user = User.objects.get(name=name)
        except:
            return Response(
                {"error": "User not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        if latitude is None or longitude is None:
            return Response(
                {"error": "Latitude and longitude are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        location = Point(float(longitude), float(latitude))

        group_data = {
            'group_name': request.data.get('group_name'),
            'user': user,
            'starting_time': request.data.get('starting_time'),
            'ending_time': request.data.get('ending_time'),
            'address': request.data.get('address'),
            'location': location,
        }
        new_group = Group.objects.create(**group_data)
        
        group_tag_names = request.data.get('group_tag')  
        if group_tag_names:
            for tag_name in group_tag_names:
                tag, _ = Tag.objects.get_or_create(tag_name=tag_name)
                new_group.group_tag.add(tag)

        serializer = GroupSerializer(new_group)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class ListGroupView(GenericAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'page': openapi.Schema(type=openapi.TYPE_INTEGER)
            }
        ),
        responses={200: GroupSerializer}
    )
    def post(self, request):
        page = request.data.get('page')
        groups = Group.objects.all()[page:page+10]
        groups_data = GroupSerializer(groups, many=True)
        return Response(groups_data.data)
    
    