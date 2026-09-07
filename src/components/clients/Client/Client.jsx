import "./Client.css";
import SearchInput from "../../shared/SearchInput/SearchInput";
import ConfirmDeleteModal from "../../shared/ConfirmDeleteModal/ConfirmDeleteModal";
import Button from "../../shared/Button/Button";
import ResourceList from "../../shared/ResourceList/ResourceList";
import ResourceModal from "../../shared/ResourceModal/ResourceModal";
import useCrudResource from "../../../shared/hooks/useCrudResource";
import { getInitials } from "../../../shared/utils/entityUtils";
import {
  getClient,
  createClient,
  updateClient,
  deleteClient,
} from "../../../shared/api/ClientApi";

const initialForm = {
  name: "",
  phone: "",
};

const initialErrors = {
  name: "",
  phone: "",
};

const clientApi = {
  list: getClient,
  create: createClient,
  update: updateClient,
  remove: deleteClient,
};

const validateClient = (form) => ({
  name: form.name === "" ? "Ingresá un nombre válido." : "",
  phone: form.phone === "" ? "Ingresá un teléfono válido." : "",
});

const transformClientChange = ({ name, value }) => {
  if (name === "phone" && Number.isNaN(Number(value))) {
    return null;
  }

  return value;
};

const clientFields = [
  {
    name: "name",
    label: "Nombre",
    placeholder: "Ej: Juan Pérez",
  },
  {
    name: "phone",
    label: "Teléfono",
    type: "tel",
    placeholder: "Ej: 1155551234",
  },
];

const Client = () => {
  const {
    items: clients,
    filteredItems: filteredClients,
    search: clientSearch,
    setSearch: setClientSearch,
    itemToDelete: clientToDelete,
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
    confirmDelete: handleConfirmDeleteClient,
  } = useCrudResource({
    api: clientApi,
    initialForm,
    initialErrors,
    validate: validateClient,
    transformChange: transformClientChange,
  });

  return (
    <main className="clients-page">
      <header className="clients-header">
        <div>
          <p className="clients-label">Administración</p>

          <h1>Clientes</h1>
          <p className="clients-description">Gestioná los clientes registrados en la barbería.</p>
        </div>

        <Button className="new-client-button" onClick={handleCreateModal}>
          + Nuevo cliente
        </Button>
      </header>

      <section className="clients-summary">
        <article className="clients-summary-card">
          <p>Clientes registrados</p>
            <h2>{clients.length}</h2>
        </article>
      </section>

      <section className="clients-panel">
        <div className="clients-panel-header">
          <div>
            <p className="clients-panel-label">Registros</p>
            <h2>Todos los clientes</h2>
          </div>

          <SearchInput
            value={clientSearch}
            onChange={setClientSearch}
            placeholder="Buscar cliente..."
            className="clients-search"
          />
        </div>

        <ResourceList
          items={filteredClients}
          getAvatar={(client) => getInitials(client.name)}
          renderSubtitle={(client) => (
            <p className="resource-list__subtitle client-phone mb-0">
              {client.phone}
            </p>
          )}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      </section>

      {modalOpen && (
        <ResourceModal
          resourceName="cliente"
          modalMode={modalMode}
          form={form}
          errors={errors}
          fields={clientFields}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
        />
      )}

      {clientToDelete && (
        <ConfirmDeleteModal
          item={clientToDelete}
          onConfirm={handleConfirmDeleteClient}
          onCancel={handleCloseDeleteModal}
          label="Eliminar cliente"
          title="Confirmar eliminación"
        />
      )}
    </main>
  );
};

export default Client;