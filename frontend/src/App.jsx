import React, { useState } from "react";
import MainLayout from "./components/MainLayout";
import AppointmentManager from "./components/AppointmentManager";
import AllAppointments from "./components/AllAppointments";

function App() {
  const [tab, setTab] = useState("agendar");

  return (
    <MainLayout activeTab={tab} onTabChange={setTab}>
      {tab === "agendar" && <AppointmentManager />}
      {tab === "todas" && <AllAppointments />}
    </MainLayout>
  );
}

export default App;
  