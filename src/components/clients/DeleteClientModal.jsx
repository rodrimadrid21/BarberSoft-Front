const DeleteClientModal = ({
  client,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="client-modal-overlay">
      <div className="delete-client-modal">
        <div className="delete-client-header">
          <div>
            <p className="delete-client-label">Delete Client</p>
            <h2>Confirm Delete</h2>
          </div>

          <button
            className="client-modal-close"
            type="button"
            onClick={onCancel}
          >
            ×
          </button>
        </div>

        <p className="delete-client-text">
          Estas seguro de que quieres eliminar <strong>{client.name}</strong>?
        </p>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            className="btn delete-client-button"
            type="button"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteClientModal;