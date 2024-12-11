from rest_framework.viewsets import ModelViewSet
from .models import Todo
from .serializers import TodoSerializer, UserSerializer
from rest_framework import viewsets, permissions, generics
from django.contrib.auth.models import User

"""
 Create your views here.
 Le viste gestiscono le richieste API e utilizzano il serializer per restituire i dati.

 In Django REST Framework (DRF), una "view" è il livello che collega i dati del backend (modelli e serializer) 
 con i metodi HTTP (GET, POST, PUT, DELETE, ecc.). 
 La vista elabora le richieste API, utilizza il serializer per serializzare o deserializzare i dati e restituisce una risposta

ModelViewSet è una classe predefinita di DRF 
 che combina tutte le operazioni CRUD in una singola classe di vista. Ti consente di eseguire le seguenti operazioni: 
 Get, Post, Put, Delete.

queryset:
Contiene gli oggetti che verranno gestiti dalla vista.
Può essere personalizzato per filtrare o ordinare i dati.
Esempio: queryset = Todo.objects.filter(completed=False) (solo attività incomplete). 

generics.ListCreateAPIView:
Questa classe di vista gestisce le richieste GET e POST. 

"""

class TodoListCreate(generics.ListCreateAPIView): 
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    # Restituisce solo le attività dell'utente autenticato.
    def get_queryset(self):
        user = self.request.user   
        return Todo.objects.filter(author=user)
    
    # perform create() viene utilizzato per aggiungere l'autore dell'attività (utente autenticato).
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else: 
            print(serializer.errors)
        
class TodoDelete(generics.DestroyAPIView): 
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    # Restituisce solo le attività dell'utente autenticato.
    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(author=user)
    
    def perform_destroy(self, instance):
        instance.delete()
    
    
    
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)  #Permette a chiunque di creare un nuovo utente.
     
      
