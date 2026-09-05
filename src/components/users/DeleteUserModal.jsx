const DeleteUserModal = ({
  user,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="user-modal-overlay">
      <div className="delete-user-modal">
        <div className="delete-user-header">
          <div>
            <p className="delete-user-label">Delete User</p>
            <h2>Confirm Delete</h2>
          </div>

          <button
            className="user-modal-close"
            type="button"
            onClick={onCancel}
          >
            ×
          </button>
        </div>

        <p className="delete-user-text">
          ¿Estás seguro de que quieres eliminar{" "}
          <strong>{user.name}</strong>?
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
            className="btn delete-user-button"
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

export default DeleteUserModal;