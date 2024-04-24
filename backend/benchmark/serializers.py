from rest_framework import serializers
from .models import CPU, GPU, Game, UserPC


class CPUSerializer(serializers.ModelSerializer):
    class Meta:
        model = CPU
        fields = '__all__'


class GPUSerializer(serializers.ModelSerializer):
    class Meta:
        model = GPU
        fields = '__all__'


class GameSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    genre = serializers.CharField()
    release_date = serializers.DateField()
    developer = serializers.CharField()
    minimum_memory = serializers.IntegerField()
    recommended_memory = serializers.IntegerField()
    file_size = serializers.FloatField()
    minimum_cpu = CPUSerializer()
    recommended_cpu = CPUSerializer()
    minimum_gpu = GPUSerializer()
    recommended_gpu = GPUSerializer()

    def create(self, validated_data):
        return Game.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.genre = validated_data.get('genre', instance.genre)
        instance.release_date = validated_data.get(
            'release_date', instance.release_date)
        instance.developer = validated_data.get(
            'developer', instance.developer)
        instance.minimum_memory = validated_data.get(
            'minimum_memory', instance.minimum_memory)
        instance.recommended_memory = validated_data.get(
            'recommended_memory', instance.recommended_memory)
        instance.file_size = validated_data.get(
            'file_size', instance.file_size)
        instance.minimum_cpu = validated_data.get(
            'minimum_cpu', instance.minimum_cpu)
        instance.recommended_cpu = validated_data.get(
            'recommended_cpu', instance.recommended_cpu)
        instance.minimum_gpu = validated_data.get(
            'minimum_gpu', instance.minimum_gpu)
        instance.recommended_gpu = validated_data.get(
            'recommended_gpu', instance.recommended_gpu)
        instance.save()
        return instance

class UserPCSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    cpu_id = serializers.IntegerField()
    gpu_id = serializers.IntegerField()
    ram = serializers.IntegerField()
    storage = serializers.IntegerField()

    def create(self, validated_data):
        cpu_id = validated_data.pop('cpu_id')
        gpu_id = validated_data.pop('gpu_id')

        # Получаем объекты CPU и GPU по их ID
        cpu = CPU.objects.get(pk=cpu_id)
        gpu = GPU.objects.get(pk=gpu_id)

        # Создаем объект UserPC и сохраняем его
        user_pc = UserPC.objects.create(cpu=cpu, gpu=gpu, **validated_data)
        return user_pc

    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.ram = validated_data.get('ram', instance.ram)
        instance.storage = validated_data.get('storage', instance.storage)

        # Обновляем CPU и GPU, если предоставлены их ID
        cpu_id = validated_data.get('cpu_id')
        gpu_id = validated_data.get('gpu_id')

        if cpu_id is not None:
            instance.cpu = CPU.objects.get(pk=cpu_id)

        if gpu_id is not None:
            instance.gpu = GPU.objects.get(pk=gpu_id)

        instance.save()
        return instance