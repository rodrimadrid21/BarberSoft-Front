const API_URL = "https://localhost:7284/api/services";

export const getServices = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error getting services");
  }

  return await response.json();
};

export const createService = async (service) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  });

  if (!response.ok) {
    throw new Error("Error creating service");
  }

  return await response.json();
};

export const updateService = async (id, service) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  });

  if (!response.ok) {
    throw new Error("Error updating service");
  }

  return await response.json();
};

export const deleteService = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting service");
  }
};