import { useCallback, useContext } from 'react';
import { Button } from '@mui/material'; 
import type { TTask } from '../../types/TTask';
import { TaskContext } from '../../contexts/TaskContext';

type TTaskItemProps = {
  task: TTask;
  onEdit: (task: TTask) => void;
};

const TaskItem= ({ task, onEdit } : TTaskItemProps) => {

  const taskContext = useContext(TaskContext);

  const handleDelete = useCallback(() => {taskContext?.deleteTask(task.id);}, [taskContext, task.id]);

  return (
    <tr className="border-b">
      <td className="p-2">{task.title}</td>
      <td className="p-2 hidden md:table-cell">{task.description}</td>
      <td className="p-2">{task.status}</td>
      <td className="p-2">{task.priority}</td>
      <td className="p-2">{new Date(task.dueDate).toLocaleDateString()}</td>
      <td className="p-2 flex space-x-2">
        <Button variant="contained" color="primary" size="small" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Button variant="contained" color="error" size="small" onClick={handleDelete}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default TaskItem;