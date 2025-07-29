import React, { useState } from "react";

function MainLayout({ children, onTabChange, activeTab }) {
  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>🚗 Logic Studios - Citas Vehiculares</header>

      <nav style={styles.nav}>
        <button
          style={activeTab === "agendar" ? styles.tabActive : styles.tab}
          onClick={() => onTabChange("agendar")}
        >
          📅 Agendar Cita
        </button>
        <button
          style={activeTab === "todas" ? styles.tabActive : styles.tab}
          onClick={() => onTabChange("todas")}
        >
          📋 Ver Todas
        </button>
      </nav>

      <main style={styles.content}>
        {children}
      </main>

      <footer style={styles.footer}>
        © {new Date().getFullYear()} Logic Studios
      </footer>
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#7197bdff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    backgroundColor: "#2c7be5",
    padding: "15px 20px",
    color: "white",
    fontSize: 22,
    fontWeight: "bold"
  },
  nav: {
    display: "flex",
    backgroundColor: "#7a7b7bff",
    padding: 10
  },
  tab: {
    padding: "10px 20px",
    marginRight: 10,
    border: "none",
    backgroundColor: "#dee2e6",
    borderRadius: 6,
    cursor: "pointer"
  },
  tabActive: {
    padding: "10px 20px",
    marginRight: 10,
    border: "none",
    backgroundColor: "#2c7be5",
    color: "white",
    borderRadius: 6,
    cursor: "pointer"
  },
  content: {
    flex: 1,
    padding: 20,
    maxWidth: 800,
    margin: "0 auto"
  },
  footer: {
    textAlign: "center",
    fontSize: 14,
    color: "#999",
    padding: 20
  }
};

export default MainLayout;
