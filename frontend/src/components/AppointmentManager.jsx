import React, { useState } from "react";
import axios from "axios";

function AppointmentManager() {
  const [plate, setPlate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [newDate, setNewDate] = useState("");

  const fetchAppointments = async () => {
    if (!plate.trim()) return alert("Por favor ingrese una placa válida");
    try {
      const res = await axios.get(`http://localhost:5000/api/appointments/${plate}`);
      if (res.data.message) {
        setAppointments([]);
      } else {
        setAppointments(res.data);
      }
    } catch (err) {
      console.error(err);
      alert("Error al buscar citas.");
    }
  };

  const isValidSlot = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();

    if (d <= now) return false;

    const hour = d.getHours();
    const minutes = d.getMinutes();
    const validMinutes = minutes === 0 || minutes === 30;
    const validHour = hour >= 8 && (hour < 16 || (hour === 16 && minutes <= 30));

    return validMinutes && validHour;
  };

  const bookAppointment = async () => {
    if (!plate.trim() || !newDate) {
      alert("Ingrese placa y fecha válida.");
      return;
    }

    if (!isValidSlot(newDate)) {
      alert("La cita debe estar entre 8:00 AM y 4:30 PM, en intervalos de 30 minutos.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/appointments`, {
        plate: plate,
        date: newDate
      });
      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert("Error al guardar cita.");
    }
  };

  function getMinDateTime() {
    const now = new Date();
    let minDate = new Date();

    if (now.getHours() >= 16 && now.getMinutes() >= 30) {
      minDate.setDate(minDate.getDate() + 1);
    }

    minDate.setHours(8, 0, 0, 0);
    return minDate.toISOString().slice(0, 16);
  }

  function getMaxDateTime() {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    maxDate.setHours(16, 30, 0, 0);
    return maxDate.toISOString().slice(0, 16);
  }

  return (
    <div style={{ background: "black", padding: 20, borderRadius: 10 }}>
      <h2>Buscar citas por placa</h2>

      <input
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
        placeholder="Ingrese número de placa (ej: LOGIC123)"
        style={{ padding: 10, width: "60%", marginRight: 10 }}
      />
      <button onClick={fetchAppointments} style={buttonStyle("primary")}>Buscar Citas</button>

      <div style={{ marginTop: 20 }}>
        {appointments.length === 0 ? (
          <p style={{ color: "#999" }}>No tiene citas</p>
        ) : (
          <ul>
            {appointments.map((a, i) => (
              <li key={i}>
                {new Date(a.date).toLocaleString()} -{" "}
                <strong style={{ color: a.status === "ATENDIDA" ? "green" : "#2c7be5" }}>{a.status}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3 style={{ marginTop: 30 }}>Agendar nueva cita</h3>
      <input
        type="datetime-local"
        step="1800"
        min={getMinDateTime()}
        max={getMaxDateTime()}
        onChange={(e) => setNewDate(e.target.value)}
        style={{ padding: 10, marginRight: 10 }}
      />
      <button onClick={bookAppointment} style={buttonStyle("success")}>Guardar cita</button>
    </div>
  );
}

const buttonStyle = (type) => ({
  padding: "10px 20px",
  border: "none",
  borderRadius: 6,
  color: "black",
  backgroundColor: type === "primary" ? "#2c7be5" : "#00b894",
  fontWeight: "bold",
  cursor: "pointer"
});

export default AppointmentManager;
