const SummaryCard = ({
  title,
  value,
  detail,
}) => {
  return (
    <article className="summary-card">
      <h2>{value}</h2>
      <p>{title}</p>
      <span>{detail}</span>
    </article>
  );
};

export default SummaryCard;