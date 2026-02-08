import { ObjectItem } from '../lib/api';
import { ObjectCard } from './object-card';

interface ObjectListProps {
  objects: ObjectItem[];
  onDelete: () => void;
}

export function ObjectList({ objects, onDelete }: ObjectListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {objects.map((object) => (
        <ObjectCard key={object._id} object={object} onDelete={onDelete} />
      ))}
    </div>
  );
}