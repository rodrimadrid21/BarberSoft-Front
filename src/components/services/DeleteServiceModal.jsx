const DeleteModal = ({
  servicio,
  onEliminar,
  onCerrar,
}) => {
  return (
    <div className="modal-overlay">
      <div className="service-modal">
        <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
          <div>
            <p className="delete-service-label">Eliminar servicio</p>

            <h2>¿Estás seguro?</h2>
          </div>

          <button
            className="modal-close"
            type="button"
            onClick={onCerrar}
          >
            ×
          </button>
        </div>

        <div className="delete-modal-content">
          <p>
            Estás por eliminar el servicio{" "}
            <strong>{servicio?.name}</strong>.
          </p>

        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={onCerrar}
          >
            Cancelar
          </button>

          <button
            className="delete-service-button"
            type="button"
            onClick={onEliminar}
          >
            Eliminar servicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;