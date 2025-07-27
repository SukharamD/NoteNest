
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/notes/';

export const getNotes = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const createNote = async (note) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(BASE_URL, note, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const updateNote = async (id, note) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${BASE_URL}${id}/`, note, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const deleteNote = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${BASE_URL}${id}/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};
