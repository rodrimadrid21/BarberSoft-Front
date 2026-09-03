const ClientModal = ({
  modalMode,
  form,
  errors,
  onChange,
  onSubmit,
  onClose,
}) => {
  return (
    <div className="client-modal-overlay">
      <div className="client-modal">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <p className="client-modal-label">
              {modalMode === "crear" ? "Nuevo cliente" : "Editar cliente"}
            </p>

            <h2>
              {modalMode === "crear" ? "Registrar cliente" : "Modificar cliente"}
            </h2>
          </div>

          <button
            className="client-modal-close"
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form
          className="d-flex flex-column gap-3"
          onSubmit={onSubmit}
        >
          <div>
            <label
              className="form-label"
              htmlFor="name"
            >
              Nombre
            </label>

            <input
              className="form-control"
              id="name"
              name="name"
              type="text"
              placeholder="Ej: Juan Pérez"
              value={form.name}
              onChange={onChange}
            />

            {errors.name && (
              <p className="client-error">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              className="form-label"
              htmlFor="phone"
            >
              Teléfono
            </label>

            <input
              className="form-control"
              id="phone"
              name="phone"
              type="tel"
              placeholder="Ej: 1155551234"
              value={form.phone}
              onChange={onChange}
            />

            {errors.phone && (
              <p className="client-error">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="d-flex justify-content-end gap-2 mt-2">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              className="btn client-save-button"
              type="submit"
            >
              {modalMode === "crear"
                ? "Crear cliente"
                : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientModal;