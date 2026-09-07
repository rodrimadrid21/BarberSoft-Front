import "./ConfirmDeleteModal.css";
import Button from "../Button/Button";

const ConfirmDeleteModal = ({
  item,
  onConfirm,
  onCancel,
  label = "Eliminar registro",
  title = "Confirmar eliminación",
  message,
}) => (
  <div className="confirm-delete-overlay">
    <div className="confirm-delete-modal">
      <div className="confirm-delete-header">
        <div>
          <p className="confirm-delete-label">{label}</p>
          <h2>{title}</h2>
        </div>

        <Button
          variant="close"
          onClick={onCancel}
          ariaLabel="Cerrar confirmación"
        >
          ×
        </Button>
      </div>

      <p className="confirm-delete-text">
        {message || (
          <>¿Estás seguro de que quieres eliminar <strong>{item.name}</strong>?</>
        )}
      </p>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>

        <Button variant="danger" onClick={onConfirm}>
          Eliminar
        </Button>
      </div>
    </div>
  </div>
);

export default ConfirmDeleteModal;
