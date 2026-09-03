import { useEffect, useState } from "react";
import "./Client.css";
import ClientList from "./ClientList";
import ClientModal from "./ClientModal";
import DeleteClientModal from "./DeleteClientModal";
import ClientSearch from "./ClientSearch";
import {getClients,createClient,updateClient,deleteClient,} from "../../api/ClientApi";

const Client = () => {
  const [client, setClient] = useState([]);

  const [clientSearch, setClientSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("crear");
  const [clientSelected, setClientSelected] = useState(null);

  const [clientToDelete, setClientToDelete] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  // UPDATE CLIENTS
  useEffect(() => {
    updateClient();
  }, []);

  const updateClient = async () => {
    try {
      const data = await getClient();
      setClient(data);
    } catch (error) {
      console.error(error);
    }
  };

  // SEARCH CLIENTS
  const handleSearchClient = (search) => {
    setClientSearch(search);
  };

  const filteredClients = client.filter((client) =>
    client.name
      .toLowerCase()
      .includes(clientSearch.toLowerCase())
  );


  // OPEN CREATE MODAL
  const openCreateModal = () => {
    setModalMode("crear");

    setForm({
      name: "",
      phone: "",
    });
    setErrors({
      name: "",
      phone: "",
    });

    setClientSelected(null);
    setModalOpen(true);
  };

  // OPEN EDIT MODAL
  const openEditModal = (client) => {
    setModalMode("editar");

    setClientSelected(client);

    setForm({
      name: client.name,
      phone: client.phone,
    });
    setErrors({
      name: "",
      phone: "",
    });

    setModalOpen(true);
  };

  // CLOSE MODAL
  const closeModal = () => {
    setModalOpen(false);
    setClientSelected(null);

    setErrors({
      name: "",
      phone: "",
    });
  };

  // CONTROL INPUTS
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

  // VALIDATE FORM
  const validateForm = () => {
    const newErrors = {
      name: "",
      phone: "",
    };

    if (form.name === "") {
      newErrors.name = "Ingresá un nombre válido.";
    }
    if (form.phone === "") {
      newErrors.phone = "Ingresá un teléfono válido.";
    }
    setErrors(newErrors);

    return !newErrors.name && !newErrors.phone;
  };

  // CREATE OR UPDATE CLIENT
  const handleSubmit = async (event) => {
    event.preventDefault();

    const validForm = validateForm();

    if (!validForm) {
      return;
    }
    try {
      if (modalMode === "crear") {
        const newClient = await createClient(form);

        setClient([...client, newClient]);
      }

      if (modalMode === "editar") {
        const updatedClient = await updateClient(
          clientSelected.id,
          form
        );
        const clientsUpdated = client.map((client) =>
          client.id === clientSelected.id
            ? updatedClient
            : client
        );

        setClient(clientsUpdated);
      }

      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  // OPEN DELETE MODAL
  const openDeleteModal = (client) => {
    setClientToDelete(client);
  };

  // CLOSE DELETE MODAL
  const closeDeleteModal = () => {
    setClientToDelete(null);
  };

  // CONFIRM DELETE CLIENT
  const confirmDeleteClient = async () => {
    try {
      await deleteClient(clientToDelete.id);

      const clientsUpdated = client.filter(
        (client) =>
          client.id !== clientToDelete.id
      );

      setClient(clientsUpdated);
      closeDeleteModal();
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
          onClick={openCreateModal}
        >
          + Nuevo cliente
        </button>
      </header>

      <section className="clients-summary">
        <article className="clients-summary-card">
          <p>Clientes registrados</p>
          <h2>{client.length}</h2>
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
          clients={filteredClients}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />
      </section>

      {modalOpen && (
        <ClientModal
          modoModal={modalMode}
          form={form}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}

      {clientToDelete && (
        <DeleteClientModal
          client={clientToDelete}
          onConfirm={confirmDeleteClient}
          onCancel={closeDeleteModal}
        />
      )}
    </main>
  );
};

export default Client;