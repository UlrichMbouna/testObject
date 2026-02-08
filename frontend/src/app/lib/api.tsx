import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiWithFile = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export interface ObjectItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export const objectsApi = {
  // Créer un objet
  createObject: async (formData: FormData) => {
    const response = await apiWithFile.post('/objects', formData);
    return response.data;
  },

  // Récupérer tous les objets
  getAllObjects: async (): Promise<ObjectItem[]> => {
    const response = await api.get('/objects');
    return response.data;
  },

  // Récupérer un objet par ID
  getObjectById: async (id: string): Promise<ObjectItem> => {
    const response = await api.get(`/objects/${id}`);
    return response.data;
  },

  // Supprimer un objet
  deleteObject: async (id: string) => {
    const response = await api.delete(`/objects/${id}`);
    return response.data;
  },
};

export default api;