import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { TTask } from '../types/TTask';
import { AuthContext } from '../contexts/AuthContext';
import { TaskContext } from '../contexts/TaskContext';
import { v4 as uuidv4 } from 'uuid';

type TTaskProviderProps = {
  children: React.ReactNode;
};

export const TaskProvider: React.FC<TTaskProviderProps> = ({ children }) => {
  const authContext = useContext(AuthContext);

  const [tasks, setTasks] = useState<TTask[]>(() => {

    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // Update task status if due date is past
  const updateOverdueTasks = useCallback(() => {
    const updatedTasks = tasks.map((task) => {
      if (new Date(task.dueDate) < new Date() && task.status !== 'Done') {
        return { ...task, status: 'Done' };
      }
      return task;
    });
    setTasks(updatedTasks as any);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }, [tasks]);

  useEffect(() => {updateOverdueTasks(); }, [updateOverdueTasks]);

  const addTask = useCallback((task: Omit<TTask, 'id' | 'userEmail'>) => {
      if (!authContext?.user?.email) return;
      const newTask: TTask = {
        ...task,
        id: uuidv4(),
        userEmail: authContext.user.email,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    },
    [tasks, authContext?.user?.email]
  );

  const updateTask = useCallback((id: string, updatedTask: Partial<TTask>) => {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      );
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }, [tasks] );

  const deleteTask = useCallback((id: string) => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    },
    [tasks]
  );

  const contextValue = useMemo(() => ({ tasks, addTask, updateTask, deleteTask }),
    [tasks, addTask, updateTask, deleteTask]
  );

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};