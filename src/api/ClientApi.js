const API_URL = "https://localhost:7284/api/client";

export const getClientes = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener los clientes");
  }

  return await response.json();
};

export const createCliente = async (cliente) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  if (!response.ok) {
    throw new Error("Error al crear el cliente");
  }

  return await response.json();
};

export const updateCliente = async (id, cliente) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el cliente");
  }

  return await response.json();
};

export const deleteCliente = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el cliente");
  }
};