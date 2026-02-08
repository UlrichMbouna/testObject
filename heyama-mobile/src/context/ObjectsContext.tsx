import React, { createContext, useContext, useState, useCallback } from 'react';
import { ObjectItem } from '../types/object';
import { objectsApi } from '../lib/api';
import { useSocket } from './SocketContext';

interface ObjectsContextType {
  objects: ObjectItem[];
  loading: boolean;
  error: string | null;
  fetchObjects: () => Promise<void>;
  createObject: (data: { title: string; description: string; imageUri: string }) => Promise<void>;
  deleteObject: (id: string) => Promise<void>;
}

const ObjectsContext = createContext<ObjectsContextType>({
  objects: [],
  loading: false,
  error: null,
  fetchObjects: async () => {},
  createObject: async () => {},
  deleteObject: async () => {},
});

export const useObjects = () => useContext(ObjectsContext);

export const ObjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [objects, setObjects] = useState<ObjectItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { socket } = useSocket();

  const fetchObjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await objectsApi.getAllObjects();
      setObjects(data);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement des objets');
      console.error('Error fetching objects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createObject = useCallback(async (data: { 
    title: string; 
    description: string; 
    imageUri: string 
  }) => {
    setLoading(true);
    setError(null);
    try {
      const fileName = data.imageUri.split('/').pop() || 'image.jpg';
      const fileType = fileName.split('.').pop() || 'jpg';

      const objectData = {
        title: data.title,
        description: data.description,
        image: {
          uri: data.imageUri,
          name: fileName,
          type: `image/${fileType}`,
        },
      };

      const newObject = await objectsApi.createObject(objectData);
      setObjects(prev => [newObject, ...prev]);
      
      socket?.emit('object_created', { id: newObject._id, title: newObject.title });
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création de l\'objet');
      console.error('Error creating object:', err);
    } finally {
      setLoading(false);
    }
  }, [socket]);

  const deleteObject = useCallback(async (id: string) => {
    try {
      await objectsApi.deleteObject(id);
      setObjects(prev => prev.filter(obj => obj._id !== id));
      
      socket?.emit('object_deleted', { id });
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression de l\'objet');
      console.error('Error deleting object:', err);
    }
  }, [socket]);

  return (
    <ObjectsContext.Provider
      value={{
        objects,
        loading,
        error,
        fetchObjects,
        createObject,
        deleteObject,
      }}
    >
      {children}
    </ObjectsContext.Provider>
  );
};