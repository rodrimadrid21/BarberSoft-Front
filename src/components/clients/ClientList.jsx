import Button from "../common/Button";

const ClientList = ({
  clients,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="d-flex flex-column gap-3">
      {clients.map((client) => (
        <article
          className="client-card d-flex align-items-center justify-content-between gap-3"
          key={client.id}
        >
          <div className="d-flex align-items-center gap-3">
            <div className="client-avatar">
              {client.name
                .split(" ")
                .map((word) => word.charAt(0))
                .slice(0, 2)
                .join("")}
            </div>

            <div>
              <h3 className="mb-1">
                {client.name}
              </h3>

              <p className="client-phone mb-0">
                {client.phone}
              </p>
            </div>
          </div>

          <div className="d-flex gap-2 client-actions">
            <Button
              className="edit-client-button"
              onClick={() => onEdit(client)}
            >
              Editar
            </Button>

            <Button
              variant="danger"
              onClick={() => onDelete(client)}
            >
              Eliminar
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ClientList;