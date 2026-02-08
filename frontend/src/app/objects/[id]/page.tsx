'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { objectsApi, ObjectItem } from '@/app/lib/api';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ObjectDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [object, setObject] = useState<ObjectItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchObject();
  }, [id]);

  const fetchObject = async () => {
    try {
      const data = await objectsApi.getObjectById(id);
      setObject(data);
    } catch (error) {
      console.error('Error fetching object:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!object) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Objet non trouvé</h2>
        <Button asChild>
          <Link href="/">Retour à l'accueil</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Link>
      </Button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          {object.imageUrl ? (
            <img
              src={object.imageUrl}
              alt={object.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              Pas d'image
            </div>
          )}
        </div>
        
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">{object.title}</h1>
          
          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 text-lg">{object.description}</p>
          </div>
          
          <div className="border-t pt-6">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">ID</dt>
                <dd className="mt-1 text-sm text-gray-900 font-mono">
                  {object._id}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Date de création</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatDate(object.createdAt)}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">URL de l'image</dt>
                <dd className="mt-1">
                  <a
                    href={object.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline break-all"
                  >
                    {object.imageUrl}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}