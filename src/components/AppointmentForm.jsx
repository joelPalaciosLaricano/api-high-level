// src/components/AppointmentForm.jsx
import { useState } from "react";
import { createAppointment } from "../api/appointments";
import "./AppointmentForm.css"; // Asegúrate de que este archivo exista

// Definimos los valores ocultos fuera del componente para que no aparezcan en el DOM ni en el formulario
const HIDDEN_FIELDS = {
  locationId: "r3UrTfNuQviYjKT9vfVz",
  calendarId: "axyoeGirFcFCPIYX56Vw",
  contactId: "RZhc8tYfZGmVHK0Gyt0l",
  assignedUserId: "k2ny3jf54CukYHhNHHsH",
};

const AppointmentForm = () => {
  // Solo los campos editables están en el estado del formulario
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    title: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    // 1. Validación del lado del cliente
    if (!formData.startTime || !formData.endTime) {
      const missingField = !formData.startTime
        ? "Hora de inicio"
        : "Hora de fin";
      setError(`Falta el campo requerido: ${missingField}.`);
      setLoading(false);
      return;
    }

    try {
      // 2. Formateo de fechas a ISO 8601
      const formattedData = {
        ...formData,
        startTime: new Date(formData.startTime).toISOString(),
        endTime: new Date(formData.endTime).toISOString(),
      };

      console.log(
        "Datos enviados a la API (desde el frontend):",
        formattedData
      );

      // 3. Llamada a la API del backend de Django
      await createAppointment(formattedData);

      setSuccess(true);
    } catch (err) {
      console.error("Error en la solicitud de creación de cita:", err);
      setError(
        err.message || "Error desconocido. Por favor, intente de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Crear una nueva cita</h2>
      {success && <p className="success-message">¡Cita creada con éxito! 🎉</p>}
      {error && <p className="error-message">Error: {error} 🙁</p>}
      <form onSubmit={handleSubmit}>
        {/* Los campos locationId, calendarId, contactId y assignedUserId han sido eliminados del formulario */}
        <div className="form-group">
          <label htmlFor="title">Nombre:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="startTime">Hora de inicio:</label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">Hora de fin:</label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creando cita..." : "Crear Cita"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
