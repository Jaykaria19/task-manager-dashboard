import { useContext, useCallback, useState, useMemo } from 'react';
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button } from '@mui/material';
import TaskTicket from './TaskTicket';
import type { TTask } from '../../types/TTask';
import { TaskContext } from '../../contexts/TaskContext';
import { AuthContext } from '../../contexts/AuthContext';

type TTaskListProps = {
  onEditTask: (task: TTask) => void;
  searchQuery: string;
  statusFilter: string;
  priorityFilter: string;
  dueDate: string;
};

const TaskList: React.FC<TTaskListProps> = ({ onEditTask,searchQuery,statusFilter,priorityFilter,dueDate}) => {

  const taskContext = useContext(TaskContext);
  const authContext = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Get user tasks
  const userTasks = useMemo(
    () => taskContext?.tasks.filter((task) => task.userEmail === authContext?.user?.email) || [],
    [taskContext?.tasks, authContext?.user?.email]
  );

  // Apply filters
  const filteredTasks = useMemo(() => {
    return userTasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
      const matchesDueDate = !dueDate || task.dueDate === dueDate;

      return matchesSearch && matchesStatus && matchesPriority && matchesDueDate;
    });
  }, [userTasks, searchQuery, statusFilter, priorityFilter, dueDate]);

  // Pagination logic
  const paginatedTasksByStatus : any = useMemo(() => {
    const startIndex = (currentPage - 1) * tasksPerPage;
    const endIndex = startIndex + tasksPerPage;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    return {
      Todo: paginatedTasks.filter((task) => task.status === 'Todo'),
      'In Progress': paginatedTasks.filter((task) => task.status === 'In Progress'),
      Done: paginatedTasks.filter((task) => task.status === 'Done'),
    };
  }, [filteredTasks, currentPage]);

  const totalTasks = filteredTasks.length;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  // Handle pagination navigation
  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  // Handle drag end
  const handleDragEnd = useCallback((event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) return;

      const taskId = active.id as string;
      const destinationStatus = over.data.current?.status as TTask['status'];

      if (!destinationStatus) return;
 
      const task = userTasks.find((t) => t.id === taskId);
      if (!task) return;
 
      if (task.status !== destinationStatus) {
        taskContext?.updateTask(task.id, { status: destinationStatus });
      }
    }, [taskContext, userTasks]
  );

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-col ">
        <div className="flex space-x-4 overflow-x-auto flex-1">
          {['Todo', 'In Progress', 'Done'].map((status) => (
            <SortableContext
              key={status}
              items={paginatedTasksByStatus[status].map((task : TTask) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="w-1/3 min-w-[300px] p-2 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-bold mb-4">{status}</h2>
                {paginatedTasksByStatus[status].length === 0 ? (
                  <p className="text-gray-500">No tasks</p>
                ) : (
                  paginatedTasksByStatus[status].map((task : TTask) => (
                    <TaskTicket
                      key={task.id}
                      task={task}
                      onEdit={onEditTask}
                      status={status}
                    />
                  ))
                )}
              </div>
            </SortableContext>
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between items-center px-4">
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages || 1} ({totalTasks} tasks)
          </span>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </DndContext>
  );
};

export default TaskList;