
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

export const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(
      `${API_URL}/${endpoint.replace(/^\/+/, "")}`,
      {
        ...options,
        headers,
      }
    );
  } catch {
    throw new Error(
      "Cannot connect to the backend. Start your server on port 5000 and check CORS."
    );
  }

  let data = {};

  try {
    data = await response.json();
  } catch {
    // Response was empty or not JSON.
  }

  if (!response.ok) {
    if (response.status === 401 && token) {
      localStorage.removeItem("token");
    }

    throw new Error(
      data.message || `Request failed (${response.status})`
    );
  }

  return data;
};

export default API_URL;
