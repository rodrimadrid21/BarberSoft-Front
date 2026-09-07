export const filterByName = (items, search) => {
  const normalizedSearch = search.toLowerCase();

  return items.filter((item) =>
    item.name.toLowerCase().includes(normalizedSearch)
  );
};

export const getInitials = (name) =>
  name
    .split(" ")
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join("");
