const ServiceList = ({ servicios, onEditar, onEliminar }) => {
  return (
    <div className="d-flex flex-column gap-3">
      {servicios.map((servicio) => (
        <article
          className="service-card d-grid align-items-center gap-3 p-3"
          key={servicio.id}
        >
          <div className="d-flex align-items-center gap-3">
            <div className="service-icon">
              {servicio.name.charAt(0)}
            </div>

            <div>
              <h3 className="mb-1">{servicio.name}</h3>

              <span
                className={
                  servicio.isActive
                    ? "service-status active"
                    : "service-status inactive"
                }
              >
                {servicio.isActive ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>

          <div className="d-flex flex-column gap-1 service-detail">
            <span>Duración</span>
            <strong>{servicio.duration} min</strong>
          </div>

          <div className="d-flex flex-column gap-1 service-detail">
            <span>Precio</span>
            <strong>
              ${servicio.price.toLocaleString("es-AR")}
            </strong>
          </div>

          <div className="d-flex gap-2 service-actions">
            <button
              className="btn btn-outline-light btn-sm"
              type="button"
              onClick={() => onEditar(servicio)}
            >
              Editar
            </button>

            <button
              className="btn btn-outline-danger btn-sm"
              type="button"
              onClick={() => onEliminar(servicio)}
            >
              Eliminar
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ServiceList;