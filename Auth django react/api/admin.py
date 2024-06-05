from django.contrib import admin
from .models import CustomUser, News, Tour, Comment, Request, Category
from .forms import CustomUserChangeForm, CustomUserCreationForm
from django.contrib.auth.admin import UserAdmin

@admin.register(CustomUser)
class CustomAdminUser(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm

    model = CustomUser

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')  # Определение отображаемых полей в списке объектов
    search_fields = ('title', 'content')  # Поля, по которым можно искать объекты 

@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'kind', 'time', 'price', 'discount')  # Определение отображаемых полей в списке объектов
    search_fields = ('name', 'city')  # Поля, по которым можно искать объекты
    list_filter = ('kind',)  # Фильтрация объектов по категориям

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('key', 'name')
    search_fields = ('name', 'key')

admin.site.register(Comment)

admin.site.register(Request)