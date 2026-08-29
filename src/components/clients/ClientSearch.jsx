const ClientSearch = ({
  clientSearch,
  onSearchClient,
}) => {
  const handleSearchChange = (event) => {
    onSearchClient(event.target.value);
  };

  return (
    <input
      className="form-control clients-search"
      type="text"
      placeholder="Buscar cliente..."
      onChange={handleSearchChange}
      value={clientSearch}
    />
  );
};

export default ClientSearch;