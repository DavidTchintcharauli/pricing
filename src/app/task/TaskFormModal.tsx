import React, { useState } from 'react';
import { Task } from './interface/Task'
import { TaskFormModalProps } from './interface/TaskFormModalProps'

const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  isEditMode,
  onClose,
  onSave,
  initialTask,
}) => {
  const [task, setTask] = useState<Omit<Task, 'id'>>(
    initialTask || { title: '', description: '', status: 'To Do' }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.title || !task.description) {
      alert('Title and description are required!');
      return;
    }
    onSave(task);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Task' : 'Create a New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={task.title}
            onChange={handleInputChange}
            className="border p-2 rounded mb-2 w-full"
          />
          <textarea
            name="description"
            placeholder="Task Description"
            value={task.description}
            onChange={handleInputChange}
            className="border p-2 rounded mb-2 w-full"
          />
          <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              {isEditMode ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;