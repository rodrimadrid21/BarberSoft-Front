import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">B</div>

        <div>
          <h2>BarberSoft</h2>
          <p>Gestión de barbería</p>
        </div>
      </div>

      <nav className="sidebar-navigation">
        <p className="sidebar-section-title">Principal</p>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/agenda"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Agenda
        </NavLink>

        <NavLink
          to="/clients"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Clientes
        </NavLink>

        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Servicios
        </NavLink>

        <NavLink
          to="/cobros"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Cobros
        </NavLink>

        <NavLink
          to="/reportes"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Reportes
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <NavLink
          to="/configuracion"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Configuración
        </NavLink>

        <button
          className="sidebar-logout"
          type="button"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;