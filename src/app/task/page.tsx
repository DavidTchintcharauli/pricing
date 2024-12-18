'use client';

import { useState, useRef, useEffect } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, closestCenter, DragOverlay } from '@dnd-kit/core';
import { useTasks } from '../hooks/useTasks';
import { Task } from '../task/interface/Task';
import TaskColumn from '../components/TaskColumn';
import TaskCard from '../components/TaskCard';

export default function TasksPage() {
  const { tasks, addTask, updateTaskStatus, deleteTask } = useTasks();
  const [formVisible, setFormVisible] = useState(false);
  const [formPosition, setFormPosition] = useState({ x: 0, y: 0 });
  const [contextTask, setContextTask] = useState<Task | null>(null)
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    status: 'To Do',
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setFormVisible(false);
        setContextTask(null);
        setIsEditMode(false);
      }
    };

    if (formVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formVisible]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleAddTask = () => {
    if (!newTask.title || !newTask.description) return alert('Fill in all fields!');
    if (isEditMode && contextTask) {
      updateTaskStatus(contextTask.id, newTask.status);
      contextTask.title = newTask.title;
      contextTask.description = newTask.description;
    } else {
      addTask(newTask);
    }
    setNewTask({ title: '', description: '', status: 'To Do' });
    toggleModal();
    setFormVisible(false);
    setIsEditMode(false);
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

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setFormPosition({ x: event.clientX, y: event.clientY });
    setFormVisible(true);
  };

  const handleTaskContextMenu = (event: React.MouseEvent, task: Task) => {
    event.preventDefault();
    setFormPosition({ x: event.clientX, y: event.clientY });
    setContextTask(task);
    setFormVisible(true);
  };

  const handleDeleteTask = () => {
    if (contextTask) {
      deleteTask(contextTask.id);
      setFormVisible(false);
      setContextTask(null);
    }
  };

  const handleEditTask = () => {
    if (contextTask) {
      setNewTask({
        title: contextTask.title,
        description: contextTask.description,
        status: contextTask.status,
      });
      setIsEditMode(true);
      setFormVisible(false);
      toggleModal();
    }
  };

  const handleTaskClick = (task: Task) => {
    alert(`Task Details:\n\nTitle: ${task.title}\nDescription: ${task.description}\nStatus: ${task.status}`);
  };

  return (
    <div className="container mx-auto p-8" onContextMenu={handleContextMenu}>
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
                Create
              </button>
              {/* <button
                onClick={() => setFormVisible(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4"
              >
                Create Task
              </button> */}
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
              onTaskContextMenu={handleTaskContextMenu}
              activeTaskId={activeTask?.id}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask && <TaskCard task={activeTask} onClick={() => { }} />}
        </DragOverlay>
      </DndContext>
      {formVisible && contextTask && (
        <div
          ref={formRef}
          className="absolute bg-white border p-4 rounded shadow-lg z-50"
          style={{ top: formPosition.y, left: formPosition.x }}
        >
          <h2 className="text-xl font-bold mb-4">Task Actions</h2>
          <button
            onClick={handleEditTask}
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 mb-2 w-full"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteTask}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 w-full"
          >
            Delete
          </button>
        </div>
      )}
            {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Task' : 'Create a New Task'}</h2>
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
                {isEditMode ? 'Update Task' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
