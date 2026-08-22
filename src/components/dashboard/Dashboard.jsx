import "./Dashboard.css";

import SummaryCard from "./SummaryCard";
import AppointmentCard from "./AppointmentCard";
import QuickActions from "./QuickActions";

const Dashboard = () => {
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
  ];

  return (
    <main className="dashboard-page">
      <header className="dashboard-header d-flex justify-content-between align-items-center">
        <div>
          <p className="dashboard-brand">
            BarberSoft
          </p>

          <h1>Panel principal</h1>

          <p className="dashboard-description">
            Resumen general de la barbería.
          </p>
        </div>

        <button
          className="btn dashboard-profile"
          type="button"
        >
          BS
        </button>
      </header>

      <section className="dashboard-summary">
        <SummaryCard
          titulo="Turnos de hoy"
          valor="8"
          detalle="3 pendientes"
        />

        <SummaryCard
          titulo="Ganancias de hoy"
          valor="$84.000"
          detalle="6 turnos cobrados"
        />

        <SummaryCard
          titulo="Clientes atendidos"
          valor="5"
          detalle="Durante el día"
        />

        <SummaryCard
          titulo="Próximo turno"
          valor="16:30"
          detalle="Juan Pérez"
        />
      </section>

      <section className="dashboard-content">
        <article className="dashboard-panel">
          <div className="d-flex justify-content-between align-items-center mb-4 panel-header">
            <div>
              <p>Agenda</p>
              <h2>Próximos turnos</h2>
            </div>

            <button
              className="btn btn-outline-light btn-sm"
              type="button"
            >
              Ver agenda
            </button>
          </div>

          {proximosTurnos.map((turno) => (
            <AppointmentCard
              key={turno.id}
              hora={turno.hora}
              cliente={turno.cliente}
              servicio={turno.servicio}
              estado={turno.estado}
            />
          ))}
        </article>

        <QuickActions />
      </section>
    </main>
  );
};

export default Dashboard;