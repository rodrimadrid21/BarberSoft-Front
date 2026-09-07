import "./User.css";
import SearchInput from "../../shared/SearchInput/SearchInput";
import ConfirmDeleteModal from "../../shared/ConfirmDeleteModal/ConfirmDeleteModal";
import Button from "../../shared/Button/Button";
import ResourceList from "../../shared/ResourceList/ResourceList";
import ResourceModal from "../../shared/ResourceModal/ResourceModal";
import useCrudResource from "../../../shared/hooks/useCrudResource";
import { getInitials } from "../../../shared/utils/entityUtils";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../../shared/api/UserApi";

const initialForm = {
  name: "",
  email: "",
  password: "",
};

const initialErrors = {
  name: "",
  email: "",
  password: "",
};

const userApi = {
  list: getUsers,
  create: createUser,
  update: updateUser,
  remove: deleteUser,
};

const validateUser = (form, modalMode) => ({
  name: form.name === "" ? "Ingresá un nombre válido." : "",
  email: form.email === "" ? "Ingresá un email válido." : "",
  password:
    modalMode === "crear" && form.password === ""
      ? "Ingresá una contraseña."
      : "",
});

const createUserPayload = (form) => ({
  name: form.name,
  email: form.email,
  password: form.password,
});

const updateUserPayload = (form) => ({
  name: form.name,
  email: form.email,
});

const editUserForm = (user) => ({
  name: user.name,
  email: user.email,
  password: "",
});

const userFields = [
  {
    name: "name",
    label: "Nombre",
    placeholder: "Ej: Juan Pérez",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Ej: juan@email.com",
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    placeholder: "Ingresá una contraseña",
    visible: ({ modalMode }) => modalMode === "crear",
  },
];

const User = () => {
  const {
    items: users,
    filteredItems: filteredUsers,
    search: userSearch,
    setSearch: setUserSearch,
    itemToDelete: userToDelete,
    modalMode,
    modalOpen,
    form,
    errors,
    openCreateModal: handleCreateModal,
    openEditModal: handleOpenEditModal,
    closeModal: handleCloseModal,
    handleChange,
    handleSubmit,
    openDeleteModal: handleOpenDeleteModal,
    closeDeleteModal: handleCloseDeleteModal,
    confirmDelete: handleConfirmDeleteUser,
  } = useCrudResource({
    api: userApi,
    initialForm,
    initialErrors,
    validate: validateUser,
    createPayload: createUserPayload,
    updatePayload: updateUserPayload,
    editForm: editUserForm,
  });

  return (
    <main className="users-page">
      <header className="users-header">
        <div>
          <p className="users-label">Administración</p>

          <h1>Usuarios</h1>

          <p className="users-description">
            Gestioná los usuarios registrados en la barbería.
          </p>
        </div>

        <Button className="new-user-button" onClick={handleCreateModal}>
          + Nuevo usuario
        </Button>
      </header>

      <section className="users-summary">
        <article className="users-summary-card">
          <p>Usuarios registrados</p>
          <h2>{users.length}</h2>
        </article>
      </section>

      <section className="users-panel">
        <div className="users-panel-header">
          <div>
            <p className="users-panel-label">Registros</p>
            <h2>Todos los usuarios</h2>
          </div>

          <SearchInput
            value={userSearch}
            onChange={setUserSearch}
            placeholder="Buscar usuario..."
            className="users-search"
          />
        </div>

        <ResourceList
          items={filteredUsers}
          getAvatar={(user) => getInitials(user.name)}
          renderSubtitle={(user) => (
            <>
              <p className="resource-list__subtitle user-email mb-0">
                {user.email}
              </p>
              {user.role && (
                <p className="resource-list__subtitle user-role mb-0">
                  {user.role}
                </p>
              )}
            </>
          )}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      </section>

      {modalOpen && (
        <ResourceModal
          resourceName="usuario"
          modalMode={modalMode}
          form={form}
          errors={errors}
          fields={userFields}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
        />
      )}

      {userToDelete && (
        <ConfirmDeleteModal
          item={userToDelete}
          onConfirm={handleConfirmDeleteUser}
          onCancel={handleCloseDeleteModal}
          label="Eliminar usuario"
          title="Confirmar eliminación"
        />
      )}
    </main>
  );
};

export default User;