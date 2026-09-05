const UserModal = ({
  modalMode,
  form,
  errors,
  onChange,
  onSubmit,
  onClose,
}) => {
  return (
    <div className="user-modal-overlay">
      <div className="user-modal">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <p className="user-modal-label">
              {modalMode === "crear" ? "Nuevo usuario" : "Editar usuario"}
            </p>

            <h2>
              {modalMode === "crear"
                ? "Registrar usuario"
                : "Modificar usuario"}
            </h2>
          </div>

          <button
            className="user-modal-close"
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
              <p className="user-error">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              className="form-label"
              htmlFor="email"
            >
              Email
            </label>

            <input
              className="form-control"
              id="email"
              name="email"
              type="email"
              placeholder="Ej: juan@email.com"
              value={form.email}
              onChange={onChange}
            />

            {errors.email && (
              <p className="user-error">
                {errors.email}
              </p>
            )}
          </div>

          {modalMode === "crear" && (
            <div>
              <label
                className="form-label"
                htmlFor="password"
              >
                Contraseña
              </label>

              <input
                className="form-control"
                id="password"
                name="password"
                type="password"
                placeholder="Ingresá una contraseña"
                value={form.password}
                onChange={onChange}
              />

              {errors.password && (
                <p className="user-error">
                  {errors.password}
                </p>
              )}
            </div>
          )}

          <div className="d-flex justify-content-end gap-2 mt-2">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              className="btn user-save-button"
              type="submit"
            >
              {modalMode === "crear"
                ? "Crear usuario"
                : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
