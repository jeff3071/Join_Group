from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.contrib.gis.geos import Point
from rest_framework import status

from .services import get_nearby_group_within
from .models import Group
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
    
    def post(self, request):
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')

        if latitude is None or longitude is None:
            return Response(
                {"error": "Latitude and longitude are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        location = Point(float(longitude), float(latitude))

        request.data['location'] = location

        serializer = GroupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    
    
class ListGroupView(GenericAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    
    def get(self, request):
        groups = Group.objects.all()
        groups_data = GroupSerializer(groups, many=True)
        return Response(groups_data.data)
    
    