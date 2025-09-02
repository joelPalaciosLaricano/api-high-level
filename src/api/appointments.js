// src/api/appointments.js

const API_BASE_URL = "http://localhost:8000/api"; // Asegúrate de que esta URL sea correcta

export const createAppointment = async (appointmentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error desconocido al crear la cita");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud de creación de cita:", error);
    throw error;
  }
};
