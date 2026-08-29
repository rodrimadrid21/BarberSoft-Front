import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import dashboardImage from "../../assets/ImgBarberSoft1.png";

import SummaryCard from "./SummaryCard";
import AppointmentCard from "./AppointmentCard";

import { getClientes } from "../../api/ClientApi";
import { getServicios } from "../../api/ServiceApi";

const Dashboard = () => {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);

  // CARGAR DATOS
  const cargarDatos = async () => {
    try {
      const clientesData = await getClientes();
      const serviciosData = await getServicios();

      setClientes(clientesData);
      setServicios(serviciosData);
    } catch (error) {
      console.error("Error al cargar el dashboard:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // DATOS CALCULADOS
  const serviciosActivos = servicios.filter((servicio) => servicio.isActive).length;
  const serviciosInactivos = servicios.filter((servicio) => !servicio.isActive).length;

  // DATOS TEMPORALES (Appointment)
  const proximosTurnos = [
    {
      id: 1,
      hora: "16:30",
      cliente: "Juan Pérez",
      servicio: "Corte clásico",
      estado: "Confirmado",
    },
    {
      id: 2,
      hora: "17:15",
      cliente: "Martín López",
      servicio: "Corte y barba",
      estado: "Pendiente",
    },
    {
      id: 3,
      hora: "18:00",
      cliente: "Lucas Gómez",
      servicio: "Barba",
      estado: "Confirmado",
    },
    {
      id: 4,
      hora: "19:00",
      cliente: "Tomás Díaz",
      servicio: "Degradado",
      estado: "Pendiente",
    },
  ];

  // DATOS TEMPORALES (Transaction)
  const facturacionSemanal = [
    { dia: "LUN", valor: 42 },
    { dia: "MAR", valor: 68 },
    { dia: "MIÉR", valor: 48 },
    { dia: "JUE", valor: 56 },
    { dia: "VIE", valor: 61 },
    { dia: "SÁB", valor: 82 },
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
            Actualmente tenés {clientes.length} clientes registrados
            <br />
            y {serviciosActivos} servicios activos.
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
        <SummaryCard titulo="Clientes" valor={clientes.length} detalle="Registrados"/>
        <SummaryCard titulo="Servicios" valor={servicios.length} detalle="Disponibles"/>
        <SummaryCard titulo="Servicios" valor={serviciosActivos} detalle="Activos"/>
        <SummaryCard titulo="Servicios" valor={serviciosInactivos} detalle="Inactivos"/>
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
            {proximosTurnos.map((turno) => (
              <AppointmentCard
                key={turno.id}
                hora={turno.hora}
                cliente={turno.cliente}
                servicio={turno.servicio}
                estado={turno.estado}
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
              {facturacionSemanal.map((dia) => (
                <div
                  className="billing-column"
                  key={dia.dia}
                >
                  <div className="billing-bar-container">
                    <div
                      className={
                        dia.dia === "SÁB" ? "billing-bar active" : "billing-bar"
                      }
                      style={{
                        height: `${dia.valor}%`,
                      }}
                    />
                  </div>

                  <span>{dia.dia}</span>
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
