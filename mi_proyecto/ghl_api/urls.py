from django.urls import path
from . import views

urlpatterns = [
    path('appointments/create/', views.AppointmentCreateView.as_view(), name='create-appointment'),
]
