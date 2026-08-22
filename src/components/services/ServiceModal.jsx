const ServiceModal = ({
  modoModal,
  form,
  onChange,
  onSubmit,
  onCerrar,
}) => {
  return (
    <div className="modal-overlay">
      <div className="service-modal">
        <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
          <div>
            <p className="modal-label">
              {modoModal === "crear"
                ? "Nuevo servicio"
                : "Editar servicio"}
            </p>

            <h2>
              {modoModal === "crear"
                ? "Crear servicio"
                : "Modificar servicio"}
            </h2>
          </div>

          <button
            className="modal-close"
            type="button"
            onClick={onCerrar}
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
              required
            />
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label
                className="form-label"
                htmlFor="duration"
              >
                Duración
              </label>

              <input
                className="form-control"
                id="duration"
                name="duration"
                type="number"
                min="1"
                placeholder="30"
                value={form.duration}
                onChange={onChange}
                required
              />

              <div className="form-text">
                Minutos
              </div>
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
                min="0"
                placeholder="9000"
                value={form.price}
                onChange={onChange}
                required
              />

              <div className="form-text">
                Pesos argentinos
              </div>
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
              Servicio activo
            </label>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-2">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={onCerrar}
            >
              Cancelar
            </button>

            <button
              className="btn modal-save-button"
              type="submit"
            >
              {modoModal === "crear"
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