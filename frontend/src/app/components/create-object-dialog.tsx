'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { objectsApi } from '@/app/lib/api';
import { useSocket } from '@/app/contexts/socket-context';

export function CreateObjectDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { socket } = useSocket();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !image) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('imageUrl', image);

      await objectsApi.createObject(formData);
      
      socket?.emit('object_created', { title });
      
      setTitle('');
      setDescription('');
      setImage(null);
      setOpen(false);
      
      window.location.reload();
    } catch (error) {
      console.error('Error creating object:', error);
      alert('Erreur lors de la création de l\'objet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Nouvel objet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer un nouvel objet</DialogTitle>
          <DialogDescription>
            Ajoutez un nouvel objet avec un titre, une description et une image.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Entrez le titre"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Entrez la description"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Création...' : 'Créer l\'objet'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}