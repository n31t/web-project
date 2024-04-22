from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import CPU, GPU, Game
from .serializers import CPUSerializer, GPUSerializer, GameSerializer

@csrf_exempt
def games(request):
    if request.method == 'GET':
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True)
        return JsonResponse(serializer.data, safe=False)
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
            minimum_cpu=CPU.objects.get(CPU=data['minimum_cpu']),
            recommended_cpu=CPU.objects.get(CPU=data['recommended_cpu']),
            minimum_gpu=GPU.objects.get(GPU=data['minimum_gpu']),
            recommended_gpu=GPU.objects.get(GPU=data['recommended_gpu'])
        )
        serializer = GameSerializer(game)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def game(request, id):
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
    game = Game.objects.get(name=name)
    serializer = GameSerializer(game)
    return JsonResponse(serializer.data, safe=False)


#only for developers
@csrf_exempt
def cpus(request):
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
    