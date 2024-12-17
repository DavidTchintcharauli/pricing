'use client';

import { useEffect, useState } from 'react';
import { Task } from '../task/interface/Task';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const validStatuses: Task['status'][] = ['To Do', 'In Progress', 'Done'];

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const sanitizedTasks = savedTasks.map((task: Task) => ({
    ...task,
    status: validStatuses.includes(task.status) ? task.status : 'To Do',
  }));
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: Omit<Task, 'id'>) => {
    setTasks((prev) => [...prev, { id: Date.now(), ...newTask }]);
  };

  const updateTaskStatus = (taskId: number, newStatus: Task['status']) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return { tasks, addTask, updateTaskStatus };
};