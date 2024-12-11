from django.contrib import admin
from django.urls import path 
from todo.views import TodoViewSet, CreateUserView 
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import include


urlpatterns = [
    path('admin/', admin.site.urls),
    # Token
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("api-auth/", include("rest_framework.urls")),  # Login e logout per l'interfaccia amministrativa di Django.
    
    #User 
    path('api/user/register/', CreateUserView.as_view(), name='create_user'),
    
    #TODOs
    path('api/todo/', TodoViewSet.as_view({'get': 'list', 'post': 'create'}), name='todo'),
    
]
