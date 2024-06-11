from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD="email"
    REQUIRED_FIELDS=["username"]

    def __str__(self) -> str:
        return self.email

class Category(models.Model):
    key = models.CharField(max_length=100)
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.key
    
class News(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=200)
    content = models.TextField()
    info = models.TextField()
    date = models.CharField(max_length=100)  # Используем CharField для даты как строки
    image_url = models.URLField(blank=True, null=True)  # Поле для URL изображения


class Tour(models.Model):
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    kind = models.CharField(max_length=100)
    time = models.CharField(max_length=100)
    price = models.IntegerField()
    discount = models.IntegerField()
    img_url = models.URLField(blank=True, null=True)  # Поле для URL изображения
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField()
    id = models.IntegerField(primary_key=True)

class Comment(models.Model):
    id = models.IntegerField(primary_key=True)
    message = models.TextField()
    rate = models.IntegerField()
    user = models.CharField(max_length=100)

    def __str__(self):
      return f'{self.user} - {self.message}'

class Request(models.Model):
    email = models.EmailField()
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    explain = models.TextField()