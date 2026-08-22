import { useState } from "react";
import "./Client.css";

import ClientList from "./ClientList";
import ClientModal from "./ClientModal";

const Client = () => {
  const [clientes, setClientes] = useState([
    {
      id: 1,
      name: "Juan Pérez",
      phone: "11 5555-1234",
    },
    {
      id: 2,
      name: "Martín López",
      phone: "11 4444-9876",
    },
    {
      id: 3,
      name: "Lucas Gómez",
      phone: "11 3333-7654",
    },
  ]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoModal, setModoModal] = useState("crear");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  // -------------------------
  // ABRIR MODAL CREAR
  // -------------------------

  const abrirModalCrear = () => {
    setModoModal("crear");

    setForm({
      name: "",
      phone: "",
    });

    setClienteSeleccionado(null);
    setModalAbierto(true);
  };

  // -------------------------
  // ABRIR MODAL EDITAR
  // -------------------------

  const abrirModalEditar = (cliente) => {
    setModoModal("editar");

    setClienteSeleccionado(cliente);

    setForm({
      name: cliente.name,
      phone: cliente.phone,
    });

    setModalAbierto(true);
  };

  // -------------------------
  // CERRAR MODAL
  // -------------------------

  const cerrarModal = () => {
    setModalAbierto(false);
    setClienteSeleccionado(null);
  };

  // -------------------------
  // CONTROLAR INPUTS
  // -------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // -------------------------
  // CREAR / EDITAR
  // -------------------------

  const handleSubmit = (event) => {
    event.preventDefault();

    if (modoModal === "crear") {
      const nuevoCliente = {
        id: Date.now(),
        name: form.name,
        phone: form.phone,
      };

      setClientes([...clientes, nuevoCliente]);
    }

    if (modoModal === "editar") {
      const clientesActualizados = clientes.map((cliente) =>
        cliente.id === clienteSeleccionado.id
          ? {
              ...cliente,
              name: form.name,
              phone: form.phone,
            }
          : cliente
      );

      setClientes(clientesActualizados);
    }

    cerrarModal();
  };

  // -------------------------
  // ELIMINAR CLIENTE
  // -------------------------

  const eliminarCliente = (cliente) => {
    const confirmar = window.confirm(
      `¿Querés eliminar a ${cliente.name}?`
    );

    if (!confirmar) {
      return;
    }

    const clientesActualizados = clientes.filter(
      (clienteActual) => clienteActual.id !== cliente.id
    );

    setClientes(clientesActualizados);
  };

  return (
    <main className="clients-page">
      <header className="clients-header">
        <div>
          <p className="clients-label">
            Administración
          </p>

          <h1>Clientes</h1>

          <p className="clients-description">
            Gestioná los clientes registrados en la barbería.
          </p>
        </div>

        <button
          className="btn new-client-button"
          type="button"
          onClick={abrirModalCrear}
        >
          + Nuevo cliente
        </button>
      </header>

      <section className="clients-summary">
        <article className="clients-summary-card">
          <p>Clientes registrados</p>
          <h2>{clientes.length}</h2>
        </article>
      </section>

      <section className="clients-panel">
        <div className="clients-panel-header">
          <div>
            <p className="clients-panel-label">
              Directorio
            </p>

            <h2>Clientes</h2>
          </div>

          <input
            className="form-control clients-search"
            type="text"
            placeholder="Buscar cliente..."
          />
        </div>

        <ClientList
          clientes={clientes}
          onEditar={abrirModalEditar}
          onEliminar={eliminarCliente}
        />
      </section>

      {modalAbierto && (
        <ClientModal
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

export default Client;