import { useEffect, useState } from "react";
import "./User.css";
import UserList from "./UserList";
import UserModal from "./UserModal";
import DeleteUserModal from "./DeleteUserModal";
import UserSearch from "./UserSearch";
import { getUsers, createUser, updateUser, deleteUser, } from "../../api/UserApi";

const User = () => {
  const [users, setUsers] = useState([]);

  const [userSearch, setUserSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("crear");
  const [userSelected, setUserSelected] = useState(null);

  const [userToDelete, setUserToDelete] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    general: "",
  });

  // GET USERS
  const handleGetUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  // LOAD USERS
  useEffect(() => {
    handleGetUsers();
  }, []);

  // SEARCH USERS
  const handleSearchUser = (search) => {
    setUserSearch(search);
  };

  const filteredUsers = users.filter((user) =>
    user.name
      .toLowerCase()
      .includes(userSearch.toLowerCase())
  );

  // OPEN CREATE MODAL
  const handleCreateModal = () => {
    setModalMode("crear");

    setForm({
      name: "",
      email: "",
      password: "",
    });

    setErrors({
      name: "",
      email: "",
      password: "",
      general: "",
    });

    setUserSelected(null);
    setModalOpen(true);
  };

  // OPEN EDIT MODAL
  const handleOpenEditModal = (user) => {
    setModalMode("editar");

    setUserSelected(user);

    setForm({
      name: user.name,
      email: user.email,
      password: "",
    });

    setErrors({
      name: "",
      email: "",
      password: "",
      general: "",
    });

    setModalOpen(true);
  };

  // CLOSE MODAL
  const handleCloseModal = () => {
    setModalOpen(false);
    setUserSelected(null);

    setErrors({
      name: "",
      email: "",
      password: "",
      general: "",
    });
  };

  // CONTROL INPUTS
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // VALIDATE FORM
  const handleValidateForm = () => {
  const newErrors = {
    name: "",
    email: "",
    password: "",
    general: "",
  };

  if (form.name === "") {
    newErrors.name = "Ingresá un nombre válido.";
  }

  if (form.email === "") {
    newErrors.email = "Ingresá un email válido.";
  }

  if (modalMode === "crear") {
    if (form.password === "") {
      newErrors.password = "Ingresá una contraseña.";
    } else if (form.password.length < 4) {
      newErrors.password =
        "La contraseña debe tener al menos 4 caracteres.";
    }
  }

  setErrors(newErrors);

  return (
    !newErrors.name &&
    !newErrors.email &&
    !newErrors.password
  );
};

  // CREATE OR UPDATE USER
  const handleSubmit = async (event) => {
    event.preventDefault();

    const validForm = handleValidateForm();

    if (!validForm) {
      return;
    }

    try {
      if (modalMode === "crear") {
        const newUser = await createUser({
          name: form.name,
          email: form.email,
          password: form.password,
        });

        setUsers([...users, newUser]);
      }

      if (modalMode === "editar") {
        const updatedUser = await updateUser(
          userSelected.id,
          {
            name: form.name,
            email: form.email,
          }
        );

        const usersUpdated = users.map((user) =>
          user.id === userSelected.id
            ? updatedUser
            : user
        );

        setUsers(usersUpdated);
      }

      handleCloseModal();
      
    } catch (error) {
      if (error.message === "Username already exists.") {
        setErrors({
          ...errors,
          name: "Ya existe un usuario con ese nombre.",
        });
      
        return;
      }
    
      if (error.message === "Email already exists.") {
        setErrors({
          ...errors,
          email: "Ya existe un usuario con ese email.",
        });
      
        return;
      }
    
      setErrors({
        ...errors,
        general: "Ocurrió un error al guardar el usuario.",
      });
    }
  };

  // OPEN DELETE MODAL
  const handleOpenDeleteModal = (user) => {
    setUserToDelete(user);
  };

  // CLOSE DELETE MODAL
  const handleCloseDeleteModal = () => {
    setUserToDelete(null);
  };

  // CONFIRM DELETE USER
  const handleConfirmDeleteUser = async () => {
    try {
      await deleteUser(userToDelete.id);

      const usersUpdated = users.filter(
        (user) =>
          user.id !== userToDelete.id
      );

      setUsers(usersUpdated);
      handleCloseDeleteModal();
    } catch (error) {
      console.error(error);
    }
  };

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

        <button
          className="btn new-user-button"
          type="button"
          onClick={handleCreateModal}
        >
          + Nuevo usuario
        </button>
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

          <UserSearch
            userSearch={userSearch}
            onSearchUser={handleSearchUser}
          />
        </div>

        <UserList
          users={filteredUsers}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      </section>

      {modalOpen && (
        <UserModal
          modalMode={modalMode}
          form={form}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
        />
      )}

      {userToDelete && (
        <DeleteUserModal
          user={userToDelete}
          onConfirm={handleConfirmDeleteUser}
          onCancel={handleCloseDeleteModal}
        />
      )}
    </main>
  );
};

export default User;