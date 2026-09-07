const UserList = ({
  users,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="d-flex flex-column gap-3">
      {users.map((user) => (
        <article
          className="user-card d-flex align-items-center justify-content-between gap-3"
          key={user.id}
        >
          <div className="d-flex align-items-center gap-3">
            <div className="user-avatar">
              {user.name
                .split(" ")
                .map((word) => word.charAt(0))
                .slice(0, 2)
                .join("")}
            </div>

            <div>
              <h3 className="mb-1">
                {user.name}
              </h3>

              <p className="user-email mb-0">
                {user.email}
              </p>

              {user.role && (
                <p className="user-role mb-0">
                  {user.role}
                </p>
              )}
            </div>
          </div>

          <div className="d-flex gap-2 user-actions">
            <button
              className="edit-user-button"
              type="button"
              onClick={() => onEdit(user)}
            >
              Editar
            </button>

            <button
              className="delete-user-button"
              type="button"
              onClick={() => onDelete(user)}
            >
              Eliminar
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default UserList;