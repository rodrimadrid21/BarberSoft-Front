const API_URL = "https://localhost:7284/api/client";

export const getClients = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error getting clients");
  }

  return await response.json();
};

export const createClient = async (client) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    throw new Error("Error creating client");
  }

  return await response.json();
};

export const updateClient = async (id, client) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    throw new Error("Error updating client");
  }

  return await response.json();
};

export const deleteClient = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting client");
  }
};