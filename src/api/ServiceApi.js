const API_URL = "https://localhost:7279/api/services";

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
    throw new Error("Error al editar el servicio");
  }
};

export const deleteServicio = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el servicio");
  }
};