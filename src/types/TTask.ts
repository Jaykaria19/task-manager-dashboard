export type TTaskStatus = 'Todo' | 'In Progress' | 'Done';

export type TTaskPriority = 'Low' | 'Medium' | 'High';

export type TTask = {
  id: string;
  title: string;
  description: string;
  status: TTaskStatus;
  priority: TTaskPriority;
  dueDate: string;  
  userEmail: string; 
};

export type TTaskContext = {
  tasks: TTask[];
  addTask: (task: Omit<TTask, 'id' | 'userEmail'>) => void;
  updateTask: (id: string, task: Partial<TTask>) => void;
  deleteTask: (id: string) => void;
};  