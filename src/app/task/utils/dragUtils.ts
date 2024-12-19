import { Task } from '../interface/Task';

export const handleDragStart = (tasks: Task[], activeTaskId: number | string): Task | null =>
  tasks.find((t) => t.id === activeTaskId) || null;

export const handleDragEnd = (
  tasks: Task[],
  updateTaskStatus: (id: number, status: Task['status']) => void,
  active: { id: string | number },
  over: { id: string | number } | null
): void => {
  if (!over || active.id === over.id) return;

  const validStatuses: Task['status'][] = ['To Do', 'In Progress', 'Done'];
  const targetStatus = validStatuses.includes(over.id as Task['status'])
    ? (over.id as Task['status'])
    : null;

  if (targetStatus) {
    updateTaskStatus(active.id as number, targetStatus);
  }
};
