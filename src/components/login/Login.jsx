import { useNavigate } from "react-router-dom";
import "./Login.css";

import loginImage from "../../assets/ImgBarberSoft0.png";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <main className="login-page">
      <section className="login-presentation">
        <img
          className="login-presentation-image"
          src={loginImage}
          alt=""
        />

        <div className="login-presentation-overlay"></div>

        <div className="presentation-content">

          <h1>
            Cada corte.<br />
            Cada cliente.<br />
            <span> Bajo control.</span>
          </h1>

          <p>
            Gestioná tu equipo, conocé a tus clientes y administrá tus servicios desde un solo lugar.
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
          <div className="login-brand">
            <div className="login-brand-logo">
              B
            </div>

            <div>
              <p className="login-brand-name">
                BarberSoft
              </p>

              <span className="login-brand-description">
                Gestión de barbería
              </span>
            </div>
          </div>

          <div className="login-header">
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
              <label
                className="form-label"
                htmlFor="email"
              >
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
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label
                  className="form-label mb-0"
                  htmlFor="password"
                >
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