const ClientList = ({
  clientes,
  onEditar,
  onEliminar,
}) => {
  return (
    <div className="d-flex flex-column gap-3">
      {clientes.map((cliente) => (
        <article
          className="client-card d-flex align-items-center justify-content-between gap-3"
          key={cliente.id}
        >
          <div className="d-flex align-items-center gap-3">
            <div className="client-avatar">
              {cliente.name
                .split(" ")
                .map((palabra) => palabra.charAt(0))
                .slice(0, 2)
                .join("")}
            </div>

            <div>
              <h3 className="mb-1">
                {cliente.name}
              </h3>

              <p className="client-phone mb-0">
                {cliente.phone}
              </p>
            </div>
          </div>

          <div className="d-flex gap-2 client-actions">
            <button
              className="btn btn-outline-light btn-sm"
              type="button"
              onClick={() => onEditar(cliente)}
            >
              Editar
            </button>

            <button
              className="btn btn-outline-danger btn-sm"
              type="button"
              onClick={() => onEliminar(cliente)}
            >
              Eliminar
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ClientList;