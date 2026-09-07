const AppointmentCard = ({
  hour,
  client,
  service,
  state,
}) => {
  return (
    <div className="appointment-item">
      <div className="appointment-time">
        {hour}
      </div>

      <div className="appointment-info">
        <h3>{client}</h3>
        <p>{service}</p>
      </div>

      <span
        className={
          state === "Confirmado"
            ? "appointment-status confirmed"
            : "appointment-status pending"
        }
      >
        {state}
      </span>
    </div>
  );
};

export default AppointmentCard;