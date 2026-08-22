const QuickActions = () => {
  return (
    <aside className="dashboard-panel d-flex flex-column gap-2 quick-actions">
      <div className="mb-2 panel-header">
        <p>Accesos rápidos</p>
        <h2>¿Qué querés hacer?</h2>
      </div>

      <button className="btn quick-action-button">
        Crear nuevo turno
      </button>

      <button className="btn quick-action-button">
        Registrar cliente
      </button>

      <button className="btn quick-action-button">
        Administrar servicios
      </button>

      <button className="btn quick-action-button">
        Ver ganancias
      </button>
    </aside>
  );
};

export default QuickActions;