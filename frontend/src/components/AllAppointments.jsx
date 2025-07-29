import React, { useEffect, useState } from "react";
import axios from "axios";

function AllAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/appointments")
      .then(res => setAppointments(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ background: "white", padding: 20, borderRadius: 10 }}>
      <h2 style={{ color: "#000" }}>Todas las citas registradas</h2>
      {appointments.length === 0 ? (
        <p>No hay citas registradas aún.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff" }}>
  <thead>
    <tr style={{ background: "#eee" }}>
      <th style={cell}>#</th>
      <th style={cell}>Placa</th>
      <th style={cell}>Fecha</th>
      <th style={cell}>Estado</th>
    </tr>
  </thead>
  <tbody>
    {appointments.map((a, i) => (
      <tr key={i}>
        <td style={cell}>{i + 1}</td>
        <td style={cell}>{a.plate}</td>
        <td style={cell}>{new Date(a.date).toLocaleString()}</td>
        <td style={{
          ...cell,
          color: a.status === "ATENDIDA" ? "green" : "#2c7be5",
          fontWeight: "bold"
        }}>
          {a.status}
        </td>
      </tr>
    ))}
  </tbody>
</table>

      )}
    </div>
  );
}

const cell = {
  padding: 10,
  borderBottom: "1px solid #ccc",
  textAlign: "left",
  color: "#333", // << agrega esto para asegurar visibilidad
};

export default AllAppointments;
