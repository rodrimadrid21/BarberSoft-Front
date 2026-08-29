import { useNavigate } from "react-router-dom";
import "./ComingSoon.css";

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <main className="coming-soon-page">
      <div className="coming-soon-content">
        <p>BARBERSOFT</p>

        <h1>Estamos trabajando en esta sección</h1>

        <span>
          Esta funcionalidad estará disponible próximamente.
        </span>

        <button
          className="btn coming-soon-button"
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          Volver al inicio
        </button>
      </div>
    </main>
  );
};

export default ComingSoon;