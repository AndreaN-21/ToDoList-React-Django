from rest_framework.viewsets import ModelViewSet
from .models import Todo
from .serializers import TodoSerializer, UserSerializer
from rest_framework import viewsets, permissions, generics
from django.contrib.auth.models import User


# Create your views here.
# Le viste gestiscono le richieste API e utilizzano il serializer per restituire i dati.

# In Django REST Framework (DRF), una "view" è il livello che collega i dati del backend (modelli e serializer) 
# con i metodi HTTP (GET, POST, PUT, DELETE, ecc.). 
# La vista elabora le richieste API, utilizza il serializer per serializzare o deserializzare i dati e restituisce una risposta


#ModelViewSet è una classe predefinita di DRF 
# che combina tutte le operazioni CRUD in una singola classe di vista. Ti consente di eseguire le seguenti operazioni: 
# Get, Post, Put, Delete.


class TodoViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,) # Permette a chiunque di creare un nuovo utente.
      
