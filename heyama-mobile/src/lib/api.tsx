import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { CreateObjectDto, ObjectItem } from '../types/object';

const API_BASE_URL = 'http://172.20.10.3:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const objectsApi = {
  // Créer un objet
  createObject: async (data: CreateObjectDto): Promise<ObjectItem> => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    
    // Convertir l'URI en blob
    const fileInfo = await FileSystem.getInfoAsync(data.image.uri);
    if (!fileInfo.exists) {
      throw new Error('File does not exist');
    }

    // @ts-ignore
    formData.append('image', {
      uri: data.image.uri,
      name: data.image.name,
      type: data.image.type,
    });

    const response = await api.post('/objects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
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
  deleteObject: async (id: string): Promise<void> => {
    await api.delete(`/objects/${id}`);
  },
};

export default api;