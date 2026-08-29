const ServiceSearch = ({
  serviceSearch,
  onSearchService,
}) => {
  const handleSearchChange = (event) => {
    onSearchService(event.target.value);
  };

  return (
    <input
      className="form-control services-search"
      type="text"
      placeholder="Buscar servicio..."
      onChange={handleSearchChange}
      value={serviceSearch}
    />
  );
};

export default ServiceSearch;