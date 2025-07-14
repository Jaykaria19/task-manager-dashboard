export type TTaskStatus = 'Todo' | 'In Progress' | 'Done';

export type TTaskPriority = 'Low' | 'Medium' | 'High';

export type TTask = {
  id: string;
  title: string;
  description: string;
  status: TTaskStatus;
  priority: TTaskPriority;
  dueDate: string; // ISO date string (e.g., '2025-07-15')
  userEmail: string; // To associate tasks with the logged-in user
};

export type TTaskContext = {
  tasks: TTask[];
  addTask: (task: Omit<TTask, 'id' | 'userEmail'>) => void;
  updateTask: (id: string, task: Partial<TTask>) => void;
  deleteTask: (id: string) => void;
};  