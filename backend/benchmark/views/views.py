from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import CPU, GPU, Game
from ..serializers import CPUSerializer, GPUSerializer, GameSerializer
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import redirect

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')  # Перенаправление на страницу входа после успешной регистрации
    else:
        form = UserCreationForm()
    return JsonResponse({'form': form}, safe=False)

@csrf_exempt
@api_view(['GET', 'POST'])
def games(request):
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Unauthorized'}, status=401)
    if request.method == 'GET':
        games = Game.objects.all()
        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(games, request)
        serializer = GameSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    elif request.method == 'POST':
        data = json.loads(request.body)
        game = Game.objects.create(
            name=data['name'],
            genre=data['genre'],
            release_date=data['release_date'],
            developer=data['developer'],
            minimum_memory=data['minimum_memory'],
            recommended_memory=data['recommended_memory'],
            file_size=data['file_size'],
            # minimum_cpu=CPU.objects.get(CPU=data['minimum_cpu']),
            # recommended_cpu=CPU.objects.get(CPU=data['recommended_cpu']),
            # minimum_gpu=GPU.objects.get(GPU=data['minimum_gpu']),
            # recommended_gpu=GPU.objects.get(GPU=data['recommended_gpu'])
            minimum_cpu=CPU.objects.get(id=data['minimum_cpu']),
            recommended_cpu=CPU.objects.get(id=data['recommended_cpu']),
            minimum_gpu=GPU.objects.get(id=data['minimum_gpu']),
            recommended_gpu=GPU.objects.get(id=data['recommended_gpu'])
        )
        serializer = GameSerializer(game)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def game(request, id):
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Unauthorized'}, status=401)
    if request.method == 'GET':
        game = Game.objects.get(id=id)
        serializer = GameSerializer(game)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'PUT':
        data = json.loads(request.body)
        game = Game.objects.get(id=id)
        game.name = data['name']
        game.genre = data['genre']
        game.release_date = data['release_date']
        game.developer = data['developer']
        game.minimum_memory = data['minimum_memory']
        game.recommended_memory = data['recommended_memory']
        game.file_size = data['file_size']
        game.minimum_cpu = CPU.objects.get(id=data['minimum_cpu'])
        game.recommended_cpu = CPU.objects.get(id=data['recommended_cpu'])
        game.minimum_gpu = GPU.objects.get(id=data['minimum_gpu'])
        game.recommended_gpu = GPU.objects.get(id=data['recommended_gpu'])
        game.save()
        serializer = GameSerializer(game)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'DELETE':
        game = Game.objects.get(id=id)
        game.delete()
        return JsonResponse({'message': 'Game deleted'}, safe=False)


def game_by_name(request, name):
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Unauthorized'}, status=401)
    title = name.replace('_', ' ').lower()
    game = Game.objects.get(name__iexact=title)
    serializer = GameSerializer(game)
    return JsonResponse(serializer.data, safe=False)


# only for developers
@csrf_exempt
def cpus(request):
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Unauthorized'}, status=401)
    if request.method == 'GET':
        cpus = CPU.objects.all()
        serializer = CPUSerializer(cpus, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = json.loads(request.body)
        cpu = CPU.objects.create(
            name=data['name'],
            release_date=data['release_date']
        )
        serializer = CPUSerializer(cpu)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def cpu(request, id):
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Unauthorized'}, status=401)
    if request.method == 'GET':
        cpu = CPU.objects.get(id=id)
        serializer = CPUSerializer(cpu)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'PUT':
        data = json.loads(request.body)
        cpu = CPU.objects.get(id=id)
        cpu.name = data['name']
        cpu.release_date = data['release_date']
        cpu.save()
        serializer = CPUSerializer(cpu)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'DELETE':
        cpu = CPU.objects.get(id=id)
        cpu.delete()
        return JsonResponse({'message': 'CPU deleted'}, safe=False)


@csrf_exempt
def gpus(request):
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Unauthorized'}, status=401)
    if request.method == 'GET':
        gpus = GPU.objects.all()
        serializer = GPUSerializer(gpus, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = json.loads(request.body)
        gpu = GPU.objects.create(
            name=data['name'],
            release_date=data['release_date']
        )
        serializer = GPUSerializer(gpu)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def gpu(request, id):
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Unauthorized'}, status=401)
    if request.method == 'GET':
        gpu = GPU.objects.get(id=id)
        serializer = GPUSerializer(gpu)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'PUT':
        data = json.loads(request.body)
        gpu = GPU.objects.get(id=id)
        gpu.name = data['name']
        gpu.release_date = data['release_date']
        gpu.save()
        serializer = GPUSerializer(gpu)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'DELETE':
        gpu = GPU.objects.get(id=id)
        gpu.delete()
        return JsonResponse({'message': 'GPU deleted'}, safe=False)
