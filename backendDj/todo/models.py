from django.db import models
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated


# Create your models here. 

class Todo(models.Model):
    title = models.CharField(max_length=200)   
    completed = models.BooleanField(default=False)   
    created_at = models.DateTimeField(auto_now_add=True)
    # related_name consente di accedere alle attività di un utente. Esempio: user.todos.all() restituisce tutte le attività di un utente.
    # on_delete=models.CASCADE: se un utente viene eliminato, tutte le sue attività verranno eliminate. 
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos') 
    permission_classes = [IsAuthenticated] 

    def __str__(self):
        return self.title
    
    
    
    
    
    
