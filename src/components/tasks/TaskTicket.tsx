import { useCallback, useContext, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IconButton } from '@mui/material';
import type { TTask } from '../../types/TTask';
import { TaskContext } from '../../contexts/TaskContext';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import DragIcon from '../../icons/DragIcon';
import EditIcon from '../../icons/EditIcon';
import DeleteIcon from '../../icons/DeleteIcon';

type TTaskTicketProps = {
  task: TTask;
  onEdit?: (task: TTask) => void;
  status: string;
};

const TaskTicket: React.FC<TTaskTicketProps> = ({ task, onEdit, status }) => {
  const taskContext = useContext(TaskContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {  attributes, listeners, setNodeRef, transform, transition,} = useSortable({
    id: task.id,
    data: { status },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEdit = useCallback(() => {
    if (onEdit) {
      onEdit(task);
   }
  }, [task, onEdit]);

  const handleDeleteClick = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    taskContext?.deleteTask(task.id);
    setIsDeleteModalOpen(false);
  }, [taskContext, task.id]);

  const handleCancelDelete = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  return (
    <>
      <div ref={setNodeRef}  style={style} {...attributes}
        className="bg-white p-4 mb-4 rounded-lg shadow-md">
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            <IconButton
              size="small"
              {...listeners}
              aria-label="drag"
              className="cursor-move"
            >
             <DragIcon/>
            </IconButton>
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <IconButton size="small" onClick={handleEdit} aria-label="edit">
              <EditIcon/>
            </IconButton>
            <IconButton size="small" onClick={handleDeleteClick} aria-label="delete">
              <DeleteIcon/>
            </IconButton>
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        taskName={task.title}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default TaskTicket;