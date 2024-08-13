from django.shortcuts import render
from rest_framework import viewsets, status
from django.http import JsonResponse
from api.models import User
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
import mimetypes
import os
from api.serializer import UserSerializer
from django.http import FileResponse
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer
from api.models import File
from api.serializer import FileSerializer, ProfileSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils.crypto import get_random_string
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['get', 'patch'])
    def me(self, request):
        user = request.user
        if request.method == 'GET':
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        elif request.method == 'PATCH':
            serializer = self.get_serializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class FileViewSet(viewsets.ModelViewSet):
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)
    queryset = File.objects.all() 


    def get_queryset(self):
        return File.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        instance = self.get_object()
        file_path = instance.file.path
        file_name = os.path.basename(file_path)
        
        
        content_type, _ = mimetypes.guess_type(file_path)
        if content_type is None:
            content_type = 'application/octet-stream'
        
       
        with open(file_path, 'rb') as file:
            response = HttpResponse(file.read(), content_type=content_type)
            response['Content-Disposition'] = f'attachment; filename="{file_name}"'
            return response

    
    @action(detail=False, methods=['get'])
    def total_files(self, request):
        total=self.get_queryset().count()
        return Response({'total_files': total})
    
    
    @action(detail=True, methods=['get'])
    def generate_shared_link(self, request, pk=None):
        file = self.get_object()
        share_key = get_random_string(length=20)
        file.share_key = share_key
        file.save()
        share_url = request.build_absolute_uri(f'/api/share/{share_key}/')
        return Response({'share_url': share_url})

def shared_file_view(request, share_key):
    file = get_object_or_404(File, share_key=share_key)
    file_handle = file.file.open()
    response = FileResponse(file_handle, content_type='application/octet-stream')
    response['Content-Disposition'] = f'attachment; filename="{file.file.name}"'
    return response