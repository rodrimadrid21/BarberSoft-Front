const DeleteClientModal = ({
  cliente,
  onConfirmar,
  onCancelar,
}) => {
  return (
    <div className="client-modal-overlay">
      <div className="delete-client-modal">
        <div className="delete-client-header">
          <div>
            <p className="delete-client-label">Eliminar cliente</p>
            <h2>Confirmar eliminación</h2>
          </div>

          <button
            className="client-modal-close"
            type="button"
            onClick={onCancelar}
          >
            ×
          </button>
        </div>

        <p className="delete-client-text">
          ¿Querés eliminar a <strong>{cliente.name}</strong>?
        </p>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={onCancelar}
          >
            Cancelar
          </button>

          <button
            className="btn delete-client-button"
            type="button"
            onClick={onConfirmar}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteClientModal;