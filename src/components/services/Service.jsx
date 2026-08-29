import { useEffect, useState } from "react";
import "./Service.css";

import ServiceSearch from "./ServiceSearch";
import ServiceList from "./ServiceList";
import ServiceModal from "./ServiceModal";
import DeleteModal from "./DeleteServiceModal";

import {getServicios,createServicio,updateServicio,deleteServicio,} from "../../api/ServiceApi";

const Service = () => {
  const [servicios, setServicios] = useState([]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoModal, setModoModal] = useState("crear");

  const [serviceSearch, setServiceSearch] = useState("");

  const [servicioSeleccionado, setServicioSeleccionado] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    durationInMinutes: "",
    price: "",
    isActive: true,
  });

  const [errores, setErrores] = useState({
    name: "",
    durationInMinutes: "",
    price: "",
  });

// BUSCAR SERVICIOS
const handleSearchService = (search) => {
  setServiceSearch(search);
};

const serviciosFiltrados = servicios.filter((servicio) =>
  servicio.name
    .toLowerCase()
    .includes(serviceSearch.toLowerCase())
);

  // CARGAR SERVICIOS
  const cargarServicios = async () => {
    try {
      const data = await getServicios();

      setServicios(data);
    } catch (error) {
      console.error("Error al cargar servicios:", error);
    }
  };

  useEffect(() => {
    cargarServicios();
  }, []);

  // ABRIR MODAL CREAR
  const abrirModalCrear = () => {
    setModoModal("crear");

    setForm({
      name: "",
      durationInMinutes: "",
      price: "",
      isActive: true,
    });
    setErrores({
      name: "",
      durationInMinutes: "",
      price: "",
    });

    setServicioSeleccionado(null);
    setModalAbierto(true);
  };

  // ABRIR MODAL EDITAR
  const abrirModalEditar = (servicio) => {
    setModoModal("editar");

    setServicioSeleccionado(servicio);

    setForm({
      name: servicio.name,
      durationInMinutes: servicio.durationInMinutes,
      price: servicio.price,
      isActive: servicio.isActive,
    });
    setErrores({
      name: "",
      durationInMinutes: "",
      price: "",
    });
    setModalAbierto(true);
  };

  // ABRIR MODAL ELIMINAR
  const abrirModalEliminar = (servicio) => {
    setModoModal("eliminar");

    setServicioSeleccionado(servicio);

    setModalAbierto(true);
  };

  // CERRAR MODAL
  const cerrarModal = () => {
    setModalAbierto(false);
    setServicioSeleccionado(null);

    setErrores({
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
  const validarFormulario = () => {
    const nuevosErrores = {
      name: "",
      durationInMinutes: "",
      price: "",
    };

    if (form.name === "") {
      nuevosErrores.name = "Ingresá un nombre válido.";
    }
    if (
      form.durationInMinutes === "" ||
      Number(form.durationInMinutes) <= 0 ||
      !Number.isInteger(Number(form.durationInMinutes))
    ) {
      nuevosErrores.durationInMinutes =
        "Ingresá una duración válida.";
    }
    if (
      form.price === "" ||
      Number(form.price) <= 0
    ) {
      nuevosErrores.price =
        "Ingresá un precio válido.";
    }
    setErrores(nuevosErrores);

    return (
      !nuevosErrores.name &&
      !nuevosErrores.durationInMinutes &&
      !nuevosErrores.price
    );
  };

  // CREAR SERVICIO
  const crearServicio = async () => {
    const nuevoServicio = {
      name: form.name,
      durationInMinutes: Number(form.durationInMinutes),
      price: Number(form.price),
      isActive: form.isActive,
    };

    await createServicio(nuevoServicio);
  };

  // EDITAR SERVICIO
  const editarServicio = async () => {
    const servicioActualizado = {
      name: form.name,
      durationInMinutes: Number(form.durationInMinutes),
      price: Number(form.price),
      isActive: form.isActive,
    };

    await updateServicio(
      servicioSeleccionado.id,
      servicioActualizado
    );
  };

  // CREAR / EDITAR
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formularioValido = validarFormulario();

    if (!formularioValido) {
      return;
    }
    try {
      if (modoModal === "crear") {
        await crearServicio();
      }
      if (modoModal === "editar") {
        await editarServicio();
      }

      await cargarServicios();
      cerrarModal();
    } catch (error) {
      console.error("Error al guardar servicio:", error);
    }
  };

  // ELIMINAR SERVICIO
  const eliminarServicio = async () => {
    try {
      await deleteServicio(servicioSeleccionado.id);

      await cargarServicios();

      cerrarModal();
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
    }
  };

  // RESUMEN
  const serviciosActivos = servicios.filter(
    (servicio) => servicio.isActive
  ).length;

  const serviciosInactivos = servicios.filter(
    (servicio) => !servicio.isActive
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
          onClick={abrirModalCrear}
        >
          + Nuevo servicio
        </button>
      </header>

      <section className="services-summary">
        <article className="services-summary-card">
          <p>Servicios</p>
          <h2>{servicios.length}</h2>
        </article>
        <article className="services-summary-card">
          <p>Servicios activos</p>
          <h2>{serviciosActivos}</h2>
        </article>
        <article className="services-summary-card">
          <p>Servicios inactivos</p>
          <h2>{serviciosInactivos}</h2>
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
          servicios={serviciosFiltrados}
          onEditar={abrirModalEditar}
          onEliminar={abrirModalEliminar}
        />
      </section>

      {modalAbierto && modoModal === "eliminar" && (
        <DeleteModal
          servicio={servicioSeleccionado}
          onEliminar={eliminarServicio}
          onCerrar={cerrarModal}
        />
      )}

      {modalAbierto && modoModal !== "eliminar" && (
        <ServiceModal
          modoModal={modoModal}
          form={form}
          errores={errores}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCerrar={cerrarModal}
        />
      )}
    </main>
  );
};

export default Service;