 
from django.urls import path
from . import views


urlpatterns = [
    path('todos/', views.TodoListCreate.as_view(), name='todos-list'), 
    path('todos/<int:pk>/update/', views.TodoUpdate.as_view(), name='todo-update'),
    path('todos/<int:pk>/', views.TodoDelete.as_view(), name='todo-delete'),
     
]
