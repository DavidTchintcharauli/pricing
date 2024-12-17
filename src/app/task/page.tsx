'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, closestCenter, DragOverlay } from '@dnd-kit/core';
import { useTasks } from '../hooks/useTasks';
import { Task } from '../task/interface/Task';
import TaskColumn from '../components/TaskColumn';
import TaskCard from '../components/TaskCard';

export default function TasksPage() {
  const { tasks, addTask, updateTaskStatus } = useTasks();
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    status: 'To Do',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleAddTask = () => {
    if (!newTask.title || !newTask.description) return alert('Fill in all fields!');
    addTask(newTask);
    setNewTask({ title: '', description: '', status: 'To Do' });
    toggleModal();
  };

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as number;
    const task = tasks.find((t) => t.id === taskId);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setActiveTask(null);
      return;
    }

    const validStatuses: Task['status'][] = ['To Do', 'In Progress', 'Done'];

    let targetColumn: Task['status'] | null = null;
    if (validStatuses.includes(over.id as Task['status'])) {
      targetColumn = over.id as Task['status'];
    } else {
      const taskUnderDrop = tasks.find((task) => task.id === over.id);
      if (taskUnderDrop) targetColumn = taskUnderDrop.status;
    }
    if (targetColumn) {
      updateTaskStatus(active.id as number, targetColumn);
    } else {
      console.warn(`Invalid drop target: ${over.id}`);
    }
    setActiveTask(null);
  };


  const handleTaskClick = (task: Task) => {
    alert(`Task Details:\n\nTitle: ${task.title}\nDescription: ${task.description}\nStatus: ${task.status}`);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Board</h1>

      <button
        onClick={toggleModal}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4"
      >
        Create
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Create a New Task</h2>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="border p-2 rounded mb-2 w-full"
            />
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="border p-2 rounded mb-2 w-full"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={toggleModal} className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500">
                Cancel
              </button>
              <button onClick={handleAddTask} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          {(['To Do', 'In Progress', 'Done'] as Task['status'][]).map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter((t) => t.status === status && t.id !== activeTask?.id)}
              onTaskClick={() => { }}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask && <TaskCard task={activeTask} onClick={() => { }} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
