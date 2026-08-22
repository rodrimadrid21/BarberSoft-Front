const SummaryCard = ({ titulo, valor, detalle }) => {
  return (
    <article className="summary-card">
      <p>{titulo}</p>
      <h2>{valor}</h2>
      <span>{detalle}</span>
    </article>
  );
};

export default SummaryCard;