from django.shortcuts import render
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from .serializers import TaskSerializer
from .models import Task
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes



@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def getpost(request):
    '''
    List all task snippets
    '''
    if(request.method == 'GET'):
        last_1000 = Task.objects.filter(deleted=False).order_by('-id')[:999]
        serializer = TaskSerializer(last_1000, many=True)
        num = Task.objects.count()
        if (num == 0):
            data = {'count': 0, 'localPercent': float(0), 'totalPercent': float(0), 'entries': serializer.data}
        else:
            data = {'count': num + 1, 'localPercent': 100 * float(Task.objects.filter(deleted=True, number__gt=(Task.objects.last().number - 1000)).count()) / (num if (num < 1000) else 1000), 'totalPercent': 100 * float(Task.objects.filter(deleted=True).count()) / num, 'entries': serializer.data}
        return JsonResponse(data)
    elif(request.method == 'POST'):
        data = JSONParser().parse(request)
        serializer = TaskSerializer(data=data)
        if(serializer.is_valid()):
            serializer.validated_data['number'] = Task.objects.count() + 1
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def putdelete(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except:
        return HttpResponse(status=404)  
    if(request.method == 'PUT'):
        data = JSONParser().parse(request)  
        serializer = TaskSerializer(task, data=data)
        if(serializer.is_valid()):  
            serializer.validated_data['number'] = Task.objects.count() + 1
            serializer.save() 
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    elif(request.method == 'DELETE'):
        task.delete() 
        return HttpResponse(status=204) 