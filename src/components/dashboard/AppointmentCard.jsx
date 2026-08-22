const AppointmentCard = ({
  hora,
  cliente,
  servicio,
  estado,
}) => {
  return (
    <div className="appointment-item">
      <div className="appointment-time">
        {hora}
      </div>

      <div className="appointment-info">
        <h3>{cliente}</h3>
        <p>{servicio}</p>
      </div>

      <span
        className={
          estado === "Confirmado"
            ? "appointment-status confirmed"
            : "appointment-status pending"
        }
      >
        {estado}
      </span>
    </div>
  );
};

export default AppointmentCard;