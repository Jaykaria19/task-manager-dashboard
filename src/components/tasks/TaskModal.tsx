import { useCallback } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import TaskForm from './TaskForm';
import type { TTask } from '../../types/TTask';

type TTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  task?: TTask | null;
};

const TaskModal: React.FC<TTaskModalProps> = ({ isOpen, onClose, task }) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Modal open={isOpen}  onClose={handleClose}
      aria-labelledby="task-modal-title"  aria-describedby="task-modal-description">
      <Box
        sx={{   position: 'absolute',
          top: '50%',  left: '50%',
          transform: 'translate(-50%, -50%)', width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,  p: 4,  borderRadius: 2, }}>
        <Typography id="task-modal-title" variant="h6" component="h2" gutterBottom>
          {task ? 'Edit Task' : 'Create Task'}
        </Typography>
        <TaskForm task={task ?? undefined} onClose={handleClose} />
      </Box>
    </Modal>
  );
};

export default TaskModal;