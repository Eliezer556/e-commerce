from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import SerializerModel
from apps.users.models import Usuario
from apps.users.serializers import UserSerializer

@api_view(['GET', 'POST'])
def user_api_view(request):
    
    if request.method == 'GET':
        users = Usuario.objects.all()
        users_serializers = UserSerializer(users, many=True)
        
        test_data = {
            'first_name': 'Juansito',
            'email': 'juan@gmail.com'
        }
        
        test_user = SerializerModel(data = test_data, context = test_data)
        if test_user.is_valid():
            user_instance = test_user.save()
            print(user_instance)
        else:
            print(test_user.errors)
            
    return Response(users_serializers.data, status=status.HTTP_200_OK)