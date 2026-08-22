import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <main className="login-page">
      <section className="login-presentation">
        <div className="presentation-content">
          <span className="presentation-label">
            Gestión de barbería
          </span>

          <h1>
            Administrá tu barbería de una manera
            <span> simple y profesional.</span>
          </h1>

          <p>
            Organizá turnos, clientes, servicios y ganancias desde un único lugar.
          </p>

          <div className="presentation-features d-flex flex-wrap gap-2">
            <span>Agenda organizada</span>
            <span>Control de clientes</span>
            <span>Seguimiento de ganancias</span>
          </div>
        </div>
      </section>

      <section className="login-section">
        <div className="login-card">
          <div className="mb-4">
            <p className="login-subtitle">BarberSoft</p>
            <h2>Bienvenido</h2>
            <p className="login-description">
              Ingresá tus datos para acceder al sistema.
            </p>
          </div>

          <form
            className="d-flex flex-column gap-3"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="form-label" htmlFor="email">
                Correo electrónico
              </label>

              <input
                className="form-control"
                id="email"
                name="email"
                type="email"
                placeholder="barbero@email.com"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <div className="d-flex justify-content-between mb-2">
                <label className="form-label mb-0" htmlFor="password">
                  Contraseña
                </label>

                <button
                  className="forgot-password"
                  type="button"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <input
                className="form-control"
                id="password"
                name="password"
                type="password"
                placeholder="Ingresá tu contraseña"
                autoComplete="current-password"
                required
              />
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                id="remember"
                type="checkbox"
              />

              <label
                className="form-check-label"
                htmlFor="remember"
              >
                Recordar sesión
              </label>
            </div>

            <button
              className="btn login-button"
              type="submit"
            >
              Ingresar
            </button>
          </form>

          <p className="login-footer">
            Sistema de gestión para barberías
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;