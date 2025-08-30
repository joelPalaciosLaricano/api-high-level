import React, { useState, useEffect } from "react";
import "./formpacientes.css";

// Componente para el modal de éxito
function ModalExito({ mostrar, onClose }) {
  if (!mostrar) return null;
  return (
    <div className="modal-exito-overlay">
      <div className="modal-exito-contenido">
        <h2 className="modal-exito-titulo">¡Registro exitoso!</h2>
        <button
          className="modal-exito-boton"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

// Proporcionar funciones por defecto para evitar errores si no se pasan como props
function FormularioCita({ citaActual, onSave = () => {}, onCancel = () => {} }) {
  const [cita, setCita] = useState(citaActual || { fecha: "", hora: "", paciente: "" });
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    setCita(citaActual || { fecha: "", hora: "", paciente: "" });
  }, [citaActual]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCita({ ...cita, [name]: value });
  };

  // Esta función guarda múltiples registros en localStorage
  const guardarCitaEnLocal = (nuevaCita) => {
    // Obtenemos las citas existentes o un array vacío
    const citasGuardadas = JSON.parse(localStorage.getItem("citasJSON")) || [];
    // Determinar si es AM o PM a partir de la hora en formato 24h
    let ampm = "";
    if (nuevaCita.hora) {
      const [horaStr] = nuevaCita.hora.split(":");
      const horaNum = parseInt(horaStr, 10);
      ampm = horaNum >= 12 ? "PM" : "AM";
    }
    // Guardar la cita con la hora en formato 24h y el campo ampm
    const citaConAMPM = {
      ...nuevaCita,
      ampm: ampm,
      id: nuevaCita.id || Date.now()
    };
    const nuevasCitas = [...citasGuardadas, citaConAMPM];
    localStorage.setItem("citasJSON", JSON.stringify(nuevasCitas, null, 2));
    console.log("Citas guardadas en localStorage:", nuevasCitas);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSave === "function") {
      onSave({ ...cita });
    }
    // Guardar la cita en localStorage (varios registros)
    guardarCitaEnLocal(cita);
    // Limpiar el formulario después de guardar
    setCita({ fecha: "", hora: "", paciente: "" });
    // Mostrar el modal de éxito
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  return (
    <>
      <form className="Form" onSubmit={handleSubmit}>
        <label>
          Paciente:
          <input
            type="text"
            name="paciente"
            value={cita.paciente}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Hora:
          <div className="hora-container">
            <div className="hora-inner">
              <input
                type="time"
                name="hora"
                value={cita.hora}
                onChange={handleChange}
                required
                className="input-hora"
              />
              <span className="ampm-span">
                {cita.hora
                  ? (parseInt(cita.hora.split(":")[0], 10) >= 12 ? "PM" : "AM")
                  : "AM"}
              </span>
            </div>
          </div>
        </label>
        <label>
          Fecha:
          <input
            type="date"
            name="fecha"
            value={cita.fecha}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">{cita.id ? "Actualizar" : "Registrar"}</button>
        {cita.id && (
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </form>
      <ModalExito mostrar={mostrarModal} onClose={cerrarModal} />
    </>
  );
}

export default FormularioCita;
