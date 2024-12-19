'use client';

import { useState, useRef, useEffect } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, closestCenter, DragOverlay } from '@dnd-kit/core';
import { useTasks } from '../hooks/useTasks';
import { Task } from '../task/interface/Task';
import TaskColumn from './TaskColumn';
import TaskCard from './TaskCard';
import TaskFormModal from './TaskFormModal';
import ContextMenu from './ContextMenu';
import { handleDragStart, handleDragEnd } from './utils/dragUtils';

const TasksPage: React.FC = () => {
  const { tasks, addTask, updateTaskStatus, deleteTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formPosition, setFormPosition] = useState({ x: 0, y: 0 });
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [contextTask, setContextTask] = useState<Task | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)

  const toggleModal = () => setIsModalOpen((prev) => !prev)

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    if (isEditMode && contextTask) {
      updateTaskStatus(contextTask.id, newTask.status)
    } else {
      addTask(newTask)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Board</h1>
      <button
        onClick={() => {
          setIsEditMode(false);
          toggleModal();
        }}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4"
      >
        Create
      </button>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={(event) => setActiveTask(handleDragStart(tasks,  parseInt(event.active.id as string)))}
        onDragEnd={(event) => handleDragEnd(tasks, updateTaskStatus, event.active, event.over)
        }
      >
        <div className="grid grid-cols-3 gap-4">
          {['To Do', 'In Progress', 'Done'].map((status) => (
            <TaskColumn
              key={status}
              status={status as Task['status']}
              tasks={tasks.filter((t) => t.status === status && t.id !== activeTask?.id)}
              onTaskClick={() => { }}
              onTaskContextMenu={(e, task) => {
                e.preventDefault();
                setContextTask(task);
                setFormPosition({ x: e.clientX, y: e.clientY });
              }}
              activeTaskId={activeTask?.id}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask && <TaskCard task={activeTask} onClick={(task) => {
            alert(`Task Details:\n\nTitle: ${task.title}\nDescription: ${task.description}\nStatus: ${task.status}`);
          }} />}
        </DragOverlay>
      </DndContext>
      {contextTask && (
        <ContextMenu
          position={formPosition}
          onEdit={() => {
            setIsEditMode(true);
            toggleModal();
          }}
          onDelete={() => {
            deleteTask(contextTask.id);
            setContextTask(null);
          }}
          onClose={() => setContextTask(null)}
        />
      )}
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onSave={handleAddTask}
        initialTask={isEditMode && contextTask ? { ...contextTask } : undefined}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default TasksPage;