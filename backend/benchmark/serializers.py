from rest_framework import serializers
from .models import CPU, GPU, Game

class CPUSerializer(serializers.ModelSerializer):
    class Meta:
        model = CPU
        fields = '__all__'

class GPUSerializer(serializers.ModelSerializer):
    class Meta:
        model = GPU
        fields = '__all__'

class GameSerializer(serializers.Serializer):
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
        instance.release_date = validated_data.get('release_date', instance.release_date)
        instance.developer = validated_data.get('developer', instance.developer)
        instance.minimum_memory = validated_data.get('minimum_memory', instance.minimum_memory)
        instance.recommended_memory = validated_data.get('recommended_memory', instance.recommended_memory)
        instance.file_size = validated_data.get('file_size', instance.file_size)
        instance.minimum_cpu = validated_data.get('minimum_cpu', instance.minimum_cpu)
        instance.recommended_cpu = validated_data.get('recommended_cpu', instance.recommended_cpu)
        instance.minimum_gpu = validated_data.get('minimum_gpu', instance.minimum_gpu)
        instance.recommended_gpu = validated_data.get('recommended_gpu', instance.recommended_gpu)
        instance.save()
        return instance
