'use client';

import TaskCard from './TaskCard';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { Task } from './interface/Task';

interface TaskColumnProps {
  status: Task['status'];
  tasks: Task[];
  activeTaskId?: number | null;
  onTaskClick: (task: Task) => void;
  onTaskContextMenu: (event: React.MouseEvent, task: Task) => void
}

export default function TaskColumn({ status, tasks, activeTaskId, onTaskClick, onTaskContextMenu }: TaskColumnProps) {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-lg shadow ${
        status === 'To Do' ? 'bg-gray-100' : status === 'In Progress' ? 'bg-yellow-100' : 'bg-green-100'
      } min-h-screen`}
    >
      <h2 className="text-xl font-semibold mb-4 text-center">{status}</h2>
      <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={onTaskClick}
              onContextMenu={(event) => onTaskContextMenu(event, task)}
              isDragging={task.id === activeTaskId}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}