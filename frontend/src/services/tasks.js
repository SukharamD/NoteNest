import { BASE_URL } from "./base";


const token = localStorage.getItem("token");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Token ${token}`,
};

export const getTasks = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.warn('No token found. Skipping task fetch.');
    return []; // or throw an error
  }

  const res = await fetch(`${BASE_URL}/api/tasks/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch tasks: ${res.status}`);
  }

  return res.json();
};


export const createTask = async (task) => {
  const res = await fetch(`${BASE_URL}/api/tasks/`, {
    method: "POST",
    headers,
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id, task) => {
  const res = await fetch(`${BASE_URL}/api/tasks/${id}/`, {
    method: "PUT",
    headers,
    body: JSON.stringify(task),
  });
  return res.json();
};

export const deleteTask = async (id) => {
  await fetch(`${BASE_URL}/api/tasks/${id}/`, {
    method: "DELETE",
    headers,
  });
};