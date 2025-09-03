// src/App.jsx
import AppointmentForm from "./components/AppointmentForm";
import "./App.css"; // Opcional: para estilos globales

function App() {
  return (
    <div className="App">
      <h1>Agendar Cita</h1>
      <AppointmentForm />
    </div>
  );
}

export default App;
