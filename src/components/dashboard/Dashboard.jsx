import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import dashboardImage from "../../assets/ImgBarberSoft1.png";

import SummaryCard from "./SummaryCard";
import AppointmentCard from "./AppointmentCard";

import { getClients } from "../../api/ClientApi";
import { getServices } from "../../api/ServiceApi";

const Dashboard = () => {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);

  // CARGAR DATOS
  const loadDashboardData = async () => {
    try {
      const clientsData = await getClients();
      const servicesData = await getServices();

      setClients(clientsData);
      setServices(servicesData);
    } catch (error) {
      console.error("Error al cargar el dashboard:", error);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // DATOS CALCULADOS
  const servicesActive = services.filter((service) => service.isActive).length;
  const servicesInactive = services.filter((service) => !service.isActive).length;

  // DATOS TEMPORALES (Appointment)
  const nextAppointments = [
    {
      id: 1,
      hour: "16:30",
      client: "Juan Pérez",
      service: "Corte clásico",
      state: "Confirmado",
    },
    {
      id: 2,
      hour: "17:15",
      client: "Martín López",
      service: "Corte y barba",
      state: "Pendiente",
    },
    {
      id: 3,
      hour: "18:00",
      client: "Lucas Gómez",
      service: "Barba",
      state: "Confirmado",
    },
    {
      id: 4,
      hour: "19:00",
      client: "Tomás Díaz",
      service: "Degradado",
      state: "Pendiente",
    },
  ];

  // DATOS TEMPORALES (Transaction)
  const weeklyBilling = [
    { day: "LUN", value: 42 },
    { day: "MAR", value: 68 },
    { day: "MIÉR", value: 48 },
    { day: "JUE", value: 56 },
    { day: "VIE", value: 61 },
    { day: "SÁB", value: 82 },
  ];

  return (
    <main className="dashboard-page">

      <section className="dashboard-hero">
        <img className="dashboard-hero-image" src={dashboardImage} alt=""/>

        <div className="dashboard-hero-content">
          <h1>
            Bienvenido a
            <span> BarberSoft</span>
          </h1>
          <p className="dashboard-hero-description">
            Actualmente tenés {clients.length} clientes registrados
            <br />
            y {servicesActive} servicios activos.
          </p>
          <button className="btn dashboard-agenda-button" type="button" onClick={() => navigate("/agenda")}>
            Ver agenda completa
          </button>
        </div>

        <button className="btn dashboard-profile" type="button">
          BS
        </button>
      </section>

      <section className="dashboard-summary">
        <SummaryCard title="Clientes" value={clients.length} detail="Registrados"/>
        <SummaryCard title="Servicios" value={services.length} detail="Disponibles"/>
        <SummaryCard title="Servicios" value={servicesActive} detail="Activos"/>
        <SummaryCard title="Servicios" value={servicesInactive} detail="Inactivos"/>
      </section>

      <section className="dashboard-content">
        <article className="dashboard-panel agenda-panel">
          <div className="d-flex justify-content-between align-items-center mb-3 panel-header">
            <h2>Agenda de hoy</h2>

            <button className="btn agenda-link" type="button" onClick={() => navigate("/agenda")}>
              Ver toda la agenda →
            </button>
          </div>

          <div>
            {nextAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                hour={appointment.hour}
                client={appointment.client}
                service={appointment.service}
                state={appointment.state}
              />
            ))}
          </div>
        </article>

        <div className="dashboard-side-column">
          <article className="dashboard-panel next-appointment">
            <p className="panel-label">Próximo turno</p>

            <div className="next-appointment-content">
              <div>
                <p className="next-time">16:30</p>
                <h2>Juan Pérez</h2>
                <span className="appointment-status confirmed">
                  Confirmado
                </span>
              </div>

              <div className="next-details">
                <div>
                  <span>Duración</span>
                  <strong>45 min</strong>
                </div>
                <div>
                  <span>Servicio</span>
                  <strong>Corte clásico</strong>
                </div>
                <div>
                  <span>Barbero</span>
                  <strong>Rodrigo</strong>
                </div>
              </div>
            </div>
          </article>

          <article className="dashboard-panel billing-panel">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <p className="panel-label">Facturación de la semana</p>
                <h2>$432.000</h2>
              </div>

              <div className="billing-growth">
                ▲ 12%
                <small>vs semana anterior</small>
              </div>
            </div>

            <div className="billing-chart">
              <div className="billing-scale">
                <span>$90k</span>
                <span>$60k</span>
                <span>$30k</span>
              </div>

            <div className="billing-bars">
              {weeklyBilling.map((day) => (
                <div
                  className="billing-column"
                  key={day.day}
                >
                  <div className="billing-bar-container">
                    <div
                      className={
                        day.day === "SÁB" ? "billing-bar active" : "billing-bar"
                      }
                      style={{
                        height: `${day.value}%`,
                      }}
                    />
                  </div>

                  <span>{day.day}</span>
                </div>
              ))}
            </div></div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
