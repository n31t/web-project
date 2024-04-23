from django.db import models
from django.contrib.auth.models import User

class UserPC(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cpu = models.ForeignKey('CPU', on_delete=models.CASCADE)
    gpu = models.ForeignKey('GPU', on_delete=models.CASCADE)
    ram = models.IntegerField()
    storage = models.IntegerField()

    def __str__(self):
        return self.user.username

class CPU(models.Model):
    name = models.CharField(max_length=100)

    release_date = models.DateField()

    def __str__(self):
        return self.name
    
    def calculate_score(self):
        return self.release_date.year + self.release_date.month* 0.5 + self.release_date.day * 0.01
    
class GPU(models.Model):
    name = models.CharField(max_length=100)
    release_date = models.DateField()

    def __str__(self):
        return self.name
    
    def calculate_score(self):
        return self.release_date.year + self.release_date.month* 0.5 + self.release_date.day * 0.01
    
class Game(models.Model):
    name = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    release_date = models.DateField()
    developer = models.CharField(max_length=100)
    minimum_memory = models.IntegerField()
    recommended_memory = models.IntegerField()
    file_size = models.FloatField()
    minimum_cpu = models.ForeignKey(CPU, on_delete=models.CASCADE, related_name='minimum_cpu')
    recommended_cpu = models.ForeignKey(CPU, on_delete=models.CASCADE, related_name='recommended_cpu')
    minimum_gpu = models.ForeignKey(GPU, on_delete=models.CASCADE, related_name='minimum_gpu')
    recommended_gpu = models.ForeignKey(GPU, on_delete=models.CASCADE, related_name='recommended_gpu')

    def __str__(self):
        return self.name