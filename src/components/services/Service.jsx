import { useEffect, useState } from "react";
import "./Service.css";

import ServiceSearch from "./ServiceSearch";
import ServiceList from "./ServiceList";
import ServiceModal from "./ServiceModal";
import DeleteModal from "./DeleteServiceModal";

import {getServices,createService,updateService,deleteService,} from "../../api/ServiceApi";

const Service = () => {
  const [services, setServices] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("crear");

  const [serviceSearch, setServiceSearch] = useState("");

  const [selectedService, setSelectedService] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    durationInMinutes: "",
    price: "",
    isActive: true,
  });

  const [errors, setErrors] = useState({
    name: "",
    durationInMinutes: "",
    price: "",
  });

// BUSCAR SERVICIOS
const handleSearchService = (search) => {
  setServiceSearch(search);
};

const filteredServices = services.filter((service) =>
  service.name
    .toLowerCase()
    .includes(serviceSearch.toLowerCase())
);

  // CARGAR SERVICIOS
  const uploadServices = async () => {
    try {
      const data = await getServices();

      setServices(data);
    } catch (error) {
      console.error("Error al cargar servicios:", error);
    }
  };

  useEffect(() => {
    uploadServices();
  }, []);

  // ABRIR MODAL CREAR
  const handleCreateModal = () => {
    setModalMode("crear");

    setForm({
      name: "",
      durationInMinutes: "",
      price: "",
      isActive: true,
    });
    setErrors({
      name: "",
      durationInMinutes: "",
      price: "",
    });

    setSelectedService(null);
    setModalOpen(true);
  };

  // ABRIR MODAL EDITAR
  const handleEditModal = (service) => {
    setModalMode("editar");

    setSelectedService(service);

    setForm({
      name: service.name,
      durationInMinutes: service.durationInMinutes,
      price: service.price,
      isActive: service.isActive,
    });
    setErrors({
      name: "",
      durationInMinutes: "",
      price: "",
    });
    setModalOpen(true);
  };

  // ABRIR MODAL ELIMINAR
  const handleDeleteModal = (service) => {
    setModalMode("eliminar");

    setSelectedService(service);

    setModalOpen(true);
  };

  // CERRAR MODAL
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedService(null);

    setErrors({
      name: "",
      durationInMinutes: "",
      price: "",
    });
  };

  // CONTROLAR INPUTS
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // VALIDAR FORMULARIO
  const handleFormValidation = () => {
    const newErrors = {
      name: "",
      durationInMinutes: "",
      price: "",
    };

    if (form.name === "") {
      newErrors.name = "Ingresá un nombre válido.";
    }
    if (
      form.durationInMinutes === "" ||
      Number(form.durationInMinutes) <= 0 ||
      !Number.isInteger(Number(form.durationInMinutes))
    ) {
      newErrors.durationInMinutes =
        "Ingresá una duración válida.";
    }
    if (
      form.price === "" ||
      Number(form.price) <= 0
    ) {
      newErrors.price =
        "Ingresá un precio válido.";
    }
    setErrors(newErrors);

    return (
      !newErrors.name &&
      !newErrors.durationInMinutes &&
      !newErrors.price
    );
  };

  // CREAR SERVICIO
  const handleCreateService = async () => {
    const newService = {
      name: form.name,
      durationInMinutes: Number(form.durationInMinutes),
      price: Number(form.price),
      isActive: form.isActive,
    };

    await createServicio(newService);
  };

  // EDITAR SERVICIO
  const handleEditService = async () => {
    const updatedService = {
      name: form.name,
      durationInMinutes: Number(form.durationInMinutes),
      price: Number(form.price),
      isActive: form.isActive,
    };

    await updateServicio(
      selectedService.id,
      updatedService
    );
  };

  // CREAR / EDITAR
  const handleSubmit = async (event) => {
    event.preventDefault();

    const validForm = handleFormValidation();

    if (!validForm) {
      return;
    }
    try {
      if (modalMode === "crear") {
        await handleCreateService();
      }
      if (modalMode === "editar") {
        await handleEditService();
      }

      await uploadServices();
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar servicio:", error);
    }
  };

  // ELIMINAR SERVICIO
  const handleDeleteService = async () => {
    try {
      await deleteService(selectedService.id);

      await uploadServices();

      handleCloseModal();
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
    }
  };

  // RESUMEN
  const activeServices = services.filter(
    (service) => service.isActive
  ).length;

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

        <button
          className="btn new-service-button"
          type="button"
          onClick={handleCreateModal}
        >
          + Nuevo servicio
        </button>
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

          <ServiceSearch
            serviceSearch={serviceSearch}
            onSearchService={handleSearchService}
          />
        </div>

        <ServiceList
          services={serviciosFiltrados}
          onEdit={handleEditModal}
          onDelete={handleDeleteModal}
        />
      </section>

      {modalOpen && modalMode === "eliminar" && (
        <DeleteModal
          service={selectedService}
          onDelete={handleDeleteService}
          onClose={handleCloseModal}
        />
      )}

      {modalOpen && modalMode !== "eliminar" && (
        <ServiceModal
          modalMode={modalMode}
          form={form}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
};

export default Service;