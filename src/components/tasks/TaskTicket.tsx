import { useCallback, useContext } from 'react';
import { IconButton } from '@mui/material'; 
import type { TTask } from '../../types/TTask'; 
import { TaskContext } from '../../contexts/TaskContext'; 


type TTaskTicketProps = {
  task: TTask;
};

const TaskTicket  = ({ task }:TTaskTicketProps) => {
  const taskContext = useContext(TaskContext);

  const handleEdit = useCallback(() => {

    const currentTask = taskContext?.tasks.find((t) => t.id === task.id);
    if (currentTask) {
      
      const sidebar = document.querySelector('.sidebar') as HTMLElement | null;
      if (sidebar) {
        const event = new CustomEvent('editTask', { detail: currentTask });
        sidebar.dispatchEvent(event);
      }
    }
  }, [task, taskContext]);

  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          <p className="text-xs text-gray-500">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        </div>
        <IconButton size="small" onClick={handleEdit} aria-label="edit">
          Edit
        </IconButton>
      </div>
    </div>
  );
};

export default TaskTicket;