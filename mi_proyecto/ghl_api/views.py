import os
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from dotenv import load_dotenv

# Cargar las variables de entorno desde el archivo .env
# En un entorno de producción, las variables de entorno se
# suelen gestionar de forma diferente, pero esto es bueno para el desarrollo local.
load_dotenv()

# URL base de la API de GoHighLevel
GHL_BASE_URL = "https://services.leadconnectorhq.com"
GHL_API_VERSION = "2021-04-15"

class AppointmentCreateView(APIView):
    """
    Vista para crear una cita en el calendario de GoHighLevel.
    
    Esta vista recibe datos de un formulario y realiza una llamada
    POST a la API de GHL para agendar una cita.
    """
    def post(self, request, *args, **kwargs):
        """
        Maneja la solicitud POST para crear una cita.
        """
        # 1. Obtener el token de acceso desde las variables de entorno
        access_token = os.getenv("GHL_ACCESS_TOKEN")
        if not access_token:
            return Response(
                {"error": "El token de acceso de GHL no está configurado."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # 2. Extraer los datos necesarios del cuerpo de la solicitud (request.data)
        # Se requiere locationId, calendarId, contactId, startTime.
        # startTime y endTime deben estar en formato ISO 8601.
        data = request.data
        required_fields = ["locationId", "calendarId", "contactId", "startTime", "endTime"]
        
        for field in required_fields:
            if field not in data:
                return Response(
                    {"error": f"Falta el campo requerido: '{field}'."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # 3. Preparar el cuerpo de la solicitud para la API de GHL
        # Aquí se incluyen los campos obligatorios y otros opcionales.
        api_payload = {
            "calendarId": data["calendarId"],
            "locationId": data["locationId"],
            "contactId": data["contactId"],
            "startTime": data["startTime"],
            "endTime": data["endTime"],
            "title": data.get("title", "Cita creada desde API"),
            "appointmentStatus": data.get("appointmentStatus", "confirmed"),
            "assignedUserId": data.get("assignedUserId", None),
            # Otros campos opcionales pueden ser agregados aquí
            "ignoreFreeSlotValidation": True,
            "toNotify": True
        }

        # 4. Configurar las cabeceras de la solicitud
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Version": GHL_API_VERSION,
            "Content-Type": "application/json"
        }

        # 5. Realizar la llamada a la API de GHL para crear la cita
        try:
            response = requests.post(
                f"{GHL_BASE_URL}/calendars/events/appointments",
                json=api_payload,
                headers=headers
            )
            response.raise_for_status()  # Lanza una excepción para códigos de estado de error 4xx/5xx
            
            # Si la solicitud es exitosa, devolver la respuesta de GHL
            return Response(response.json(), status=status.HTTP_201_CREATED)

        except requests.exceptions.HTTPError as http_err:
            print(f"Error HTTP: {http_err}")
            return Response(
                {"error": "Error al crear la cita en GHL.", "details": response.json()},
                status=response.status_code
            )
        except requests.exceptions.RequestException as req_err:
            print(f"Error de solicitud: {req_err}")
            return Response(
                {"error": "Error de conexión con la API de GHL."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
