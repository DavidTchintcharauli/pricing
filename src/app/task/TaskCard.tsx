'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from './interface/Task';
import { TaskCardProps } from './interface/TaskCardProps';

export default function TaskCard({ task, onClick, onContextMenu, isDragging = false }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    visibility: isDragging ? 'hidden' : 'visible',
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onContextMenu={onContextMenu}
      style={style}
      className="border p-4 rounded bg-white shadow cursor-pointer hover:bg-gray-100"
      onClick={(e) => {
        e.stopPropagation();
        onClick(task);
      }}
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
    </div>
  );
}
