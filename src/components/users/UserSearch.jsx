const UserSearch = ({
  userSearch,
  onSearchUser,
}) => {
  const handleSearchChange = (event) => {
    onSearchUser(event.target.value);
  };

  return (
    <input
      className="form-control users-search"
      type="text"
      placeholder="Buscar usuario..."
      onChange={handleSearchChange}
      value={userSearch}
    />
  );
};

export default UserSearch;