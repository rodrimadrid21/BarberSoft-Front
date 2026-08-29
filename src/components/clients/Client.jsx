import { useEffect, useState } from "react";
import "./Client.css";
import ClientList from "./ClientList";
import ClientModal from "./ClientModal";
import DeleteClientModal from "./DeleteClientModal";
import ClientSearch from "./ClientSearch";
import {getClientes,createCliente,updateCliente,deleteCliente,} from "../../api/ClientApi";

const Client = () => {
  const [clientes, setClientes] = useState([]);

  const [clientSearch, setClientSearch] = useState("");

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoModal, setModoModal] = useState("crear");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const [clienteAEliminar, setClienteAEliminar] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const [errores, setErrores] = useState({
    name: "",
    phone: "",
  });

  // CARGAR CLIENTES
  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error(error);
    }
  };

  // BUSCAR CLIENTES
  const handleSearchClient = (search) => {
    setClientSearch(search);
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.name
      .toLowerCase()
      .includes(clientSearch.toLowerCase())
  );


  // ABRIR MODAL CREAR
  const abrirModalCrear = () => {
    setModoModal("crear");

    setForm({
      name: "",
      phone: "",
    });
    setErrores({
      name: "",
      phone: "",
    });

    setClienteSeleccionado(null);
    setModalAbierto(true);
  };

  // ABRIR MODAL EDITAR
  const abrirModalEditar = (cliente) => {
    setModoModal("editar");

    setClienteSeleccionado(cliente);

    setForm({
      name: cliente.name,
      phone: cliente.phone,
    });
    setErrores({
      name: "",
      phone: "",
    });

    setModalAbierto(true);
  };

  // CERRAR MODAL
  const cerrarModal = () => {
    setModalAbierto(false);
    setClienteSeleccionado(null);

    setErrores({
      name: "",
      phone: "",
    });
  };

  // CONTROLAR INPUTS
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "phone" && isNaN(value)) {
      return;
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  // VALIDAR FORMULARIO
  const validarFormulario = () => {
    const nuevosErrores = {
      name: "",
      phone: "",
    };

    if (form.name === "") {
      nuevosErrores.name = "Ingresá un nombre válido.";
    }
    if (form.phone === "") {
      nuevosErrores.phone = "Ingresá un teléfono válido.";
    }
    setErrores(nuevosErrores);

    return !nuevosErrores.name && !nuevosErrores.phone;
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
        const nuevoCliente = await createCliente(form);

        setClientes([...clientes, nuevoCliente]);
      }

      if (modoModal === "editar") {
        const clienteActualizado = await updateCliente(
          clienteSeleccionado.id,
          form
        );
        const clientesActualizados = clientes.map((cliente) =>
          cliente.id === clienteSeleccionado.id
            ? clienteActualizado
            : cliente
        );

        setClientes(clientesActualizados);
      }

      cerrarModal();
    } catch (error) {
      console.error(error);
    }
  };

  // ABRIR MODAL ELIMINAR
  const abrirModalEliminar = (cliente) => {
    setClienteAEliminar(cliente);
  };

  // CERRAR MODAL ELIMINAR
  const cerrarModalEliminar = () => {
    setClienteAEliminar(null);
  };

  // CONFIRMAR ELIMINACIÓN
  const confirmarEliminarCliente = async () => {
    try {
      await deleteCliente(clienteAEliminar.id);

      const clientesActualizados = clientes.filter(
        (clienteActual) =>
          clienteActual.id !== clienteAEliminar.id
      );

      setClientes(clientesActualizados);
      cerrarModalEliminar();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="clients-page">
      <header className="clients-header">
        <div>
          <p className="clients-label">Administración</p>

          <h1>Clientes</h1>
          <p className="clients-description">Gestioná los clientes registrados en la barbería.</p>
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
            <p className="clients-panel-label">Registros</p>
            <h2>Todos los clientes</h2>
          </div>

          <ClientSearch
            clientSearch={clientSearch}
            onSearchClient={handleSearchClient}
          />
        </div>

        <ClientList
          clientes={clientesFiltrados}
          onEditar={abrirModalEditar}
          onEliminar={abrirModalEliminar}
        />
      </section>

      {modalAbierto && (
        <ClientModal
          modoModal={modoModal}
          form={form}
          errores={errores}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCerrar={cerrarModal}
        />
      )}

      {clienteAEliminar && (
        <DeleteClientModal
          cliente={clienteAEliminar}
          onConfirmar={confirmarEliminarCliente}
          onCancelar={cerrarModalEliminar}
        />
      )}
    </main>
  );
};

export default Client;