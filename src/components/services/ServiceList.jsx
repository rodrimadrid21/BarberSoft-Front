import Button from "../common/Button";

const ServiceList = ({ services, onEdit, onDelete }) => {
  return (
    <div className="d-flex flex-column gap-3">
      {services.map((service) => (
        <article
          className="service-card d-grid align-items-center gap-3 p-3"
          key={service.id}
        >
          <div className="d-flex align-items-center gap-3">
            <div className="service-icon">
              {service.name.charAt(0)}
            </div>

            <div>
              <h3 className="mb-1">{service.name}</h3>

              <span
                className={
                  service.isActive
                    ? "service-status active"
                    : "service-status inactive"
                }
              >
                {service.isActive ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>

          <div className="d-flex flex-column gap-1 service-detail">
            <span>Tiempo</span>
            <strong>{service.durationInMinutes} min</strong>
          </div>

          <div className="d-flex flex-column gap-1 service-detail">
            <span>Precio</span>
            <strong>
              ${service.price.toLocaleString("es-AR")}
            </strong>
          </div>

          <div className="d-flex gap-2 service-actions">
            <Button
              className="edit-service-button"
              onClick={() => onEdit(service)}
            >
              Editar
            </Button>

            <Button variant="danger" onClick={() => onDelete(service)}>
              Eliminar
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ServiceList;