// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { objectsApi, ObjectItem } from './lib/api';
import { useSocket } from './contexts/socket-context';
import { ObjectList } from './components/object-list';

export default function HomePage() {
  const [objects, setObjects] = useState<ObjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { socket, isConnected } = useSocket();

  const fetchObjects = async () => {
    try {
      const data = await objectsApi.getAllObjects();
      setObjects(data);
    } catch (error) {
      console.error('Error fetching objects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObjects();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleObjectCreated = () => {
      fetchObjects();
    };

    const handleObjectDeleted = () => {
      fetchObjects();
    };

    socket.on('object_created', handleObjectCreated);
    socket.on('object_deleted', handleObjectDeleted);

    return () => {
      socket.off('object_created', handleObjectCreated);
      socket.off('object_deleted', handleObjectDeleted);
    };
  }, [socket]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Objets ({objects.length})</h2>
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-gray-600">
            {isConnected ? 'Connecté en temps réel' : 'Déconnecté'}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : objects.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h3 className="text-lg font-semibold">Aucun objet</h3>
          <p className="text-gray-600">Commencez par créer votre premier objet</p>
        </div>
      ) : (
        <ObjectList objects={objects} onDelete={fetchObjects} />
      )}
    </div>
  );
}