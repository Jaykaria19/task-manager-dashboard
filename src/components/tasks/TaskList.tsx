import { useCallback, useContext } from 'react';
import TaskTicket from './TaskTicket';
import type { TTask } from '../../types/TTask';
import { TaskContext } from '../../contexts/TaskContext';
import { AuthContext } from '../../contexts/AuthContext';

const TaskList: React.FC = () => {

  const taskContext = useContext(TaskContext);
  const authContext = useContext(AuthContext);

  const userTasks = taskContext?.tasks.filter((task) => task.userEmail === authContext?.user?.email ) || [];

  const tasksByPriority : any= {
    Low: userTasks.filter((task) => task.priority === 'Low'),
    Medium: userTasks.filter((task) => task.priority === 'Medium'),
    High: userTasks.filter((task) => task.priority === 'High'),
  };

  return (

    <div className="flex space-x-4 overflow-x-auto h-full">
      {['Low', 'Medium', 'High'].map((priority) => (
        <div key={priority} className="w-1/3 min-w-[300px] p-2 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">{priority}</h2>
          {tasksByPriority[priority].length === 0 ? (
            <p className="text-gray-500">No tasks</p>
          ) : (
            tasksByPriority[priority].map((task : TTask) => (
              <TaskTicket key={task.id} task={task} />
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;