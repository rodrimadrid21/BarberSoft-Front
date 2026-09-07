import "./ResourceModal.css";
import Button from "../Button/Button";

const ResourceModal = ({
  resourceName,
  modalMode,
  form,
  errors,
  fields,
  onChange,
  onSubmit,
  onClose,
}) => {
  const isCreating = modalMode === "crear";
  const visibleFields = fields.filter(
    (field) => !field.visible || field.visible({ modalMode, form })
  );

  return (
    <div className="resource-modal-overlay">
      <div className="resource-modal">
        <div className="resource-modal__header">
          <div>
            <p className="resource-modal__label">
              {isCreating ? `Nuevo ${resourceName}` : `Editar ${resourceName}`}
            </p>
            <h2>
              {isCreating
                ? `Registrar ${resourceName}`
                : `Modificar ${resourceName}`}
            </h2>
          </div>

          <Button
            variant="close"
            onClick={onClose}
            ariaLabel={`Cerrar formulario de ${resourceName}`}
          >
            ×
          </Button>
        </div>

        <form className="resource-modal__form" onSubmit={onSubmit}>
          {visibleFields.map((field) => (
            <div className={field.wrapperClassName || ""} key={field.name}>
              <label
                className="form-label"
                htmlFor={`${resourceName}-${field.name}`}
              >
                {field.label}
              </label>

              {field.type === "checkbox" ? (
                <input
                  className="form-check-input"
                  id={`${resourceName}-${field.name}`}
                  name={field.name}
                  type="checkbox"
                  checked={Boolean(form[field.name])}
                  onChange={onChange}
                />
              ) : (
                <input
                  className="form-control"
                  id={`${resourceName}-${field.name}`}
                  name={field.name}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  value={form[field.name] ?? ""}
                  onChange={onChange}
                />
              )}

              {errors[field.name] && (
                <p className="resource-modal__error">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          <div className="resource-modal__actions">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {isCreating ? `Crear ${resourceName}` : "Guardar cambios"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceModal;
