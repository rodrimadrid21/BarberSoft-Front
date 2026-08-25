const SummaryCard = ({
  titulo,
  valor,
  detalle,
}) => {
  return (
    <article className="summary-card">
      <h2>{valor}</h2>
      <p>{titulo}</p>
      <span>{detalle}</span>
    </article>
  );
};

export default SummaryCard;