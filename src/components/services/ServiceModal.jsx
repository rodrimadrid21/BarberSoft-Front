const ServiceModal = ({
  modalMode,
  form,
  errors,
  onChange,
  onSubmit,
  onClose,
}) => {
  return (
    <div className="modal-overlay">
      <div className="service-modal">
        <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
          <div>
            <p className="modal-label">
              {modalMode === "crear"
                ? "Nuevo servicio"
                : "Editar servicio"}
            </p>

            <h2>
              {modalMode === "crear"
                ? "Crear servicio"
                : "Modificar servicio"}
            </h2>
          </div>

          <button
            className="modal-close"
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
              placeholder="Ej: Corte clásico"
              value={form.name}
              onChange={onChange}
            />

            {errors.name && (
              <p className="service-error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label
                className="form-label"
                htmlFor="durationInMinutes" 
              >
                Tiempo en minutos
              </label>

              <input
                className="form-control"
                id="durationInMinutes"
                name="durationInMinutes"
                type="number"
                placeholder="30"
                value={form.durationInMinutes}
                onChange={onChange}
              />

              {errors.durationInMinutes && (
                <p className="service-error">
                  {errors.durationInMinutes}
                </p>
              )}

            </div>

            <div className="col-md-6">
              <label
                className="form-label"
                htmlFor="price"
              >
                Precio
              </label>

              <input
                className="form-control"
                id="price"
                name="price"
                type="number"
                placeholder="9000"
                value={form.price}
                onChange={onChange}
              />

              {errors.price && (
                <p className="service-error">
                  {errors.price}
                </p>
              )}

            </div>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={form.isActive}
              onChange={onChange}
            />

            <label
              className="form-check-label"
              htmlFor="isActive"
            >
              Activo
            </label>
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
              className="btn modal-save-button"
              type="submit"
            >
              {modalMode === "crear"
                ? "Crear servicio"
                : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;