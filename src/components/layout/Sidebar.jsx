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
        <div className="sidebar-logo">
          BS
        </div>

        <div>
          <h2>BarberSoft</h2>
          <p>Gestión de barbería</p>
        </div>
      </div>

      <nav className="sidebar-navigation">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <i className="bi bi-house-door"></i>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/agenda"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <i className="bi bi-calendar3"></i>
          <span>Agenda</span>
        </NavLink>

        <NavLink
          to="/clients"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <i className="bi bi-person"></i>
          <span>Clientes</span>
        </NavLink>

        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <i className="bi bi-scissors"></i>
          <span>Servicios</span>
        </NavLink>

        <NavLink
          to="/cobros"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <i className="bi bi-credit-card"></i>
          <span>Cobros</span>
        </NavLink>

        <NavLink
          to="/reportes"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <i className="bi bi-bar-chart"></i>
          <span>Reportes</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <NavLink
          to="/configuracion"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <i className="bi bi-gear"></i>
          <span>Configuración</span>
        </NavLink>

        <button
          className="sidebar-logout"
          type="button"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right"></i>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;