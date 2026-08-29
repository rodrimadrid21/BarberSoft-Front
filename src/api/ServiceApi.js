const API_URL = "https://localhost:7284/api/services";

export const getServicios = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener los servicios");
  }

  return await response.json();
};

export const createServicio = async (servicio) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(servicio),
  });

  if (!response.ok) {
    throw new Error("Error al crear el servicio");
  }

  return await response.json();
};

export const updateServicio = async (id, servicio) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(servicio),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el servicio");
  }

  return await response.json();
};

export const deleteServicio = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el servicio");
  }
};