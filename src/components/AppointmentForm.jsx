// src/components/AppointmentForm.jsx
import { useState } from "react";
import { createAppointment } from "../api/appointments";
import "./AppointmentForm.css"; // Asegúrate de que este archivo exista

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    locationId: "h9CxEloU2oK7TW5nE8YW",
    calendarId: "JMK1ds2vX46W6Y3gA4vu",
    contactId: "", // Este campo debe ser ingresado por el usuario
    assignedUserId: "to7lJ81QaFgUhFJfogGo",
    startTime: "",
    endTime: "",
    title: "Cita de prueba",
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
    if (!formData.contactId || !formData.startTime || !formData.endTime) {
      const missingField = !formData.contactId
        ? "ID del Contacto"
        : !formData.startTime
        ? "Hora de inicio"
        : "Hora de fin";
      setError(`Falta el campo requerido: ${missingField}.`);
      setLoading(false);
      return;
    }

    try {
      // 2. Formateo de fechas a ISO 8601
      // El input de tipo 'datetime-local' proporciona un formato que JavaScript puede interpretar.
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
        <div className="form-group">
          <label htmlFor="locationId">ID de la Ubicación:</label>
          <input
            type="text"
            id="locationId"
            name="locationId"
            value={formData.locationId}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="calendarId">ID del Calendario:</label>
          <input
            type="text"
            id="calendarId"
            name="calendarId"
            value={formData.calendarId}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="assignedUserId">ID de Usuario Asignado:</label>
          <input
            type="text"
            id="assignedUserId"
            name="assignedUserId"
            value={formData.assignedUserId}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactId">ID del Contacto:</label>
          <input
            type="text"
            id="contactId"
            name="contactId"
            value={formData.contactId}
            onChange={handleChange}
            required
            placeholder="Ingrese el ID del contacto"
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
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
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
