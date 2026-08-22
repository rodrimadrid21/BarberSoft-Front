import { useEffect, useState } from "react";
import "./Service.css";
import ServiceList from "./ServiceList";
import ServiceModal from "./ServiceModal";
import DeleteModal from "./DeleteModal";
import {getServicios, createServicio, updateServicio, deleteServicio} from "../../api/ServiceApi";

const Service = () => {
  const [servicios, setServicios] = useState([]);

  const [modalAbierto, setModalAbierto] = useState(false);

  const [modoModal, setModoModal] = useState("crear");

  const [servicioSeleccionado, setServicioSeleccionado] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    duration: "",
    price: "",
    isActive: true,
  });

  // -------------------------
  // CARGAR SERVICIOS
  // -------------------------

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

  // -------------------------
  // ABRIR MODAL CREAR
  // -------------------------

  const abrirModalCrear = () => {
    setModoModal("crear");

    setForm({
      name: "",
      duration: "",
      price: "",
      isActive: true,
    });

    setServicioSeleccionado(null);

    setModalAbierto(true);
  };

  // -------------------------
  // ABRIR MODAL EDITAR
  // -------------------------

  const abrirModalEditar = (servicio) => {
    setModoModal("editar");

    setServicioSeleccionado(servicio);

    setForm({
      name: servicio.name,
      duration: servicio.duration,
      price: servicio.price,
      isActive: servicio.isActive,
    });

    setModalAbierto(true);
  };

  // -------------------------
  // ABRIR MODAL ELIMINAR
  // -------------------------

  const abrirModalEliminar = (servicio) => {
    setModoModal("eliminar");

    setServicioSeleccionado(servicio);

    setModalAbierto(true);
  };

  // -------------------------
  // CERRAR MODAL
  // -------------------------

  const cerrarModal = () => {
    setModalAbierto(false);

    setServicioSeleccionado(null);
  };

  // -------------------------
  // CONTROLAR INPUTS
  // -------------------------

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // -------------------------
  // CREAR SERVICIO
  // -------------------------

  const crearServicio = async () => {
    const nuevoServicio = {
      name: form.name,
      duration: Number(form.duration),
      price: Number(form.price),
      isActive: form.isActive,
    };

    await createServicio(nuevoServicio);
  };

  // -------------------------
  // EDITAR SERVICIO
  // -------------------------

  const editarServicio = async () => {
    const servicioActualizado = {
      id: servicioSeleccionado.id,
      name: form.name,
      duration: Number(form.duration),
      price: Number(form.price),
      isActive: form.isActive,
    };

    await updateServicio(
      servicioSeleccionado.id,
      servicioActualizado
    );
  };

  // -------------------------
  // CREAR / EDITAR
  // -------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      console.error("Error:", error);
    }
  };

  // -------------------------
  // ELIMINAR SERVICIO
  // -------------------------

  const eliminarServicio = async () => {
    try {
      await deleteServicio(servicioSeleccionado.id);

      await cargarServicios();

      cerrarModal();
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
    }
  };

  return (
    <main className="services-page">
      <header className="services-header">
        <div>
          <p className="services-label">
            Administración
          </p>

          <h1>Servicios</h1>

          <p className="services-description">
            Gestioná los servicios disponibles, su duración y precio.
          </p>
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

          <h2>
            {
              servicios.filter(
                (servicio) => servicio.isActive
              ).length
            }
          </h2>
        </article>

        <article className="services-summary-card">
          <p>Servicios inactivos</p>

          <h2>
            {
              servicios.filter(
                (servicio) => !servicio.isActive
              ).length
            }
          </h2>
        </article>
      </section>

      <section className="services-panel">
        <div className="services-panel-header">
          <div>
            <p className="services-panel-label">
              Catálogo
            </p>

            <h2>Servicios disponibles</h2>
          </div>

          <input
            className="form-control services-search"
            type="text"
            placeholder="Buscar servicio..."
          />
        </div>

        <ServiceList
          servicios={servicios}
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
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCerrar={cerrarModal}
        />
      )}
    </main>
  );
};

export default Service;