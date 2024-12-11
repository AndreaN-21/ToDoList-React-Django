from rest_framework import serializers
from .models import Todo
from django.contrib.auth.models import User

"""
Il serializer trasforma i dati del modello in formato JSON (utile per il frontend).
Il file serializers.py in Django REST Framework (DRF) serve a trasformare i dati tra il 
modello di Django e i formati utilizzati dalle API (ad esempio JSON). 
In parole semplici, è il "ponte" tra i tuoi dati (modello Django) e ciò che viene inviato o ricevuto nelle richieste API.
"""

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo # Usa il modello Todo.
        fields = '__all__' # Serializza tutti i campi del modello Todo.
        extra_kwargs = {'author': {'read_only': True}} # L'autore non può essere modificato dall'utente.

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password') # Serializza solo gli id e gli username degli utenti.
        extra_kwargs = {'password': {'write_only': True, 'required': True}} # La password non viene visualizzata.
        
    # Il metodo create() viene utilizzato per creare un nuovo utente.    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

