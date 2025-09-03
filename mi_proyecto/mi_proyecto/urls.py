from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Incluye las URLs de la aplicación ghl_api
    path('api/', include('ghl_api.urls')),
]
