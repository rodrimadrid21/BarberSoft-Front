const API_URL = "https://localhost:7284/api/user";

export const getUsers = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error getting users");
  }

  return await response.json();
};

export const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Error getting user");
  }

  return await response.json();
};

export const createUser = async (user) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message);
    }

    return await response.json();
  };

export const updateUser = async (id, user) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
  const errorData = await response.json();

  throw new Error(errorData.message);
  }

  return await response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting user");
  }
};