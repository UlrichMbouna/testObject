'use client';

import { ObjectItem } from '../lib/api';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { objectsApi } from '../lib/api';
import { useSocket } from '../contexts/socket-context';
import Link from 'next/link';
import { useState } from 'react';

interface ObjectCardProps {
  object: ObjectItem;
  onDelete: () => void;
}

export function ObjectCard({ object, onDelete }: ObjectCardProps) {
  const [loading, setLoading] = useState(false);
  const { socket } = useSocket();

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet objet ?')) {
      return;
    }

    setLoading(true);
    try {
      await objectsApi.deleteObject(object._id);
      
      // Émettre un événement Socket.IO
      socket?.emit('object_deleted', { id: object._id });
      
      onDelete();
    } catch (error) {
      console.error('Error deleting object:', error);
      alert('Erreur lors de la suppression de l\'objet');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
        {object.imageUrl ? (
          <img
            src={object.imageUrl}
            alt={object.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            Pas d'image
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{object.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {object.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-600">
          Créé le {formatDate(object.createdAt)}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/objects/${object._id}`}>Voir détails</Link>
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? 'Suppression...' : 'Supprimer'}
        </Button>
      </CardFooter>
    </Card>
  );
}