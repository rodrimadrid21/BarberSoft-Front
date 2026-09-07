import "./Service.css";

import SearchInput from "../../shared/SearchInput/SearchInput";
import ConfirmDeleteModal from "../../shared/ConfirmDeleteModal/ConfirmDeleteModal";
import Button from "../../shared/Button/Button";
import ResourceList from "../../shared/ResourceList/ResourceList";
import ResourceModal from "../../shared/ResourceModal/ResourceModal";
import useCrudResource from "../../../shared/hooks/useCrudResource";

import { getServices, createService, updateService, deleteService } from "../../../shared/api/ServiceApi";

const initialForm = {
  name: "",
  durationInMinutes: "",
  price: "",
  isActive: true,
};

const initialErrors = {
  name: "",
  durationInMinutes: "",
  price: "",
};

const serviceApi = {
  list: getServices,
  create: createService,
  update: updateService,
  remove: deleteService,
};

const validateService = (form) => ({
  name: form.name === "" ? "Ingresá un nombre válido." : "",
  durationInMinutes:
    form.durationInMinutes === "" ||
    Number(form.durationInMinutes) <= 0 ||
    !Number.isInteger(Number(form.durationInMinutes))
      ? "Ingresá una duración válida."
      : "",
  price:
    form.price === "" || Number(form.price) <= 0
      ? "Ingresá un precio válido."
      : "",
});

const servicePayload = (form) => ({
  name: form.name,
  durationInMinutes: Number(form.durationInMinutes),
  price: Number(form.price),
  isActive: form.isActive,
});

const serviceFields = [
  {
    name: "name",
    label: "Nombre",
    placeholder: "Ej: Corte clásico",
  },
  {
    name: "durationInMinutes",
    label: "Tiempo en minutos",
    type: "number",
    placeholder: "30",
  },
  {
    name: "price",
    label: "Precio",
    type: "number",
    placeholder: "9000",
  },
  {
    name: "isActive",
    label: "Activo",
    type: "checkbox",
  },
];

const Service = () => {
  const {
    items: services,
    filteredItems: filteredServices,
    search: serviceSearch,
    setSearch: setServiceSearch,
    itemToDelete: selectedService,
    modalMode,
    modalOpen,
    form,
    errors,
    openCreateModal: handleCreateModal,
    openEditModal: handleEditModal,
    closeModal: handleCloseModal,
    handleChange,
    handleSubmit,
    openDeleteModal: handleDeleteModal,
    closeDeleteModal: handleCloseDeleteModal,
    confirmDelete: handleDeleteService,
  } = useCrudResource({
    api: serviceApi,
    initialForm,
    initialErrors,
    validate: validateService,
    createPayload: servicePayload,
    updatePayload: servicePayload,
    updateStrategy: "reload",
  });

  // RESUMEN
  const activeServices = services.filter((service) => service.isActive).length;

  const inactiveServices = services.filter(
    (service) => !service.isActive
  ).length;

  return (
    <main className="services-page">
      <header className="services-header">
        <div>
          <p className="services-label">Administración</p>
          <h1>Servicios</h1>
          <p className="services-description">Gestioná los servicios disponibles, su duración y precio.</p>
        </div>

        <Button className="new-service-button" onClick={handleCreateModal}>
          + Nuevo servicio
        </Button>
      </header>

      <section className="services-summary">
        <article className="services-summary-card">
          <p>Servicios</p>
          <h2>{services.length}</h2>
        </article>
        <article className="services-summary-card">
          <p>Servicios activos</p>
          <h2>{activeServices}</h2>
        </article>
        <article className="services-summary-card">
          <p>Servicios inactivos</p>
          <h2>{inactiveServices}</h2>
        </article>
      </section>

      <section className="services-panel">
        <div className="services-panel-header">
          <div>
            <p className="services-panel-label">Catálogo</p>
            <h2>Servicios disponibles</h2>
          </div>

          <SearchInput
            value={serviceSearch}
            onChange={setServiceSearch}
            placeholder="Buscar servicio..."
            className="services-search"
          />
        </div>

        <ResourceList
          items={filteredServices}
          variant="service"
          getAvatar={(service) => service.name.charAt(0)}
          renderSubtitle={(service) => (
            <span className={`service-status ${service.isActive ? "active" : "inactive"}`}>
              {service.isActive ? "Activo" : "Inactivo"}
            </span>
          )}
          renderDetails={(service) => (
            <>
              <div className="resource-list__details">
                <span>Tiempo</span>
                <strong>{service.durationInMinutes} min</strong>
              </div>
              <div className="resource-list__details">
                <span>Precio</span>
                <strong>${service.price.toLocaleString("es-AR")}</strong>
              </div>
            </>
          )}
          onEdit={handleEditModal}
          onDelete={handleDeleteModal}
        />
      </section>

      {selectedService && (
        <ConfirmDeleteModal
          item={selectedService}
          onConfirm={handleDeleteService}
          onCancel={handleCloseDeleteModal}
          label="Eliminar servicio"
          title="¿Estás seguro?"
          message={<>Estás por eliminar el servicio <strong>{selectedService?.name}</strong>.</>}
        />
      )}

      {modalOpen && (
        <ResourceModal
          resourceName="servicio"
          modalMode={modalMode}
          form={form}
          errors={errors}
          fields={serviceFields}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
};

export default Service;