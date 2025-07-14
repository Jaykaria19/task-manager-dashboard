import { useCallback, useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import { Button } from '@mui/material';
import type { TTask } from '../../types/TTask';
import CloseIcon from '@mui/icons-material/Close';

type TSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar: React.FC<TSidebarProps> = ({ isOpen, onClose }) => {
  const [editingTask, setEditingTask] = useState<TTask | null>(null);

  const handleCloseForm = useCallback(() => {
    setEditingTask(null);
    onClose();
  }, [onClose]);

  // Listen for edit events
  useEffect(() => {
    const handleEditEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.type === 'editTask' && customEvent.detail) {
        setEditingTask(customEvent.detail);
      }
    };
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.addEventListener('editTask', handleEditEvent);
      return () => sidebar.removeEventListener('editTask', handleEditEvent);
    }
  }, []);

  return (
    <div
      className={`sidebar fixed top-0 right-0 h-screen bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-80`}>
      <div className="text-end">
        <Button onClick={handleCloseForm} className="!text-end !mb-4">
          <CloseIcon />
        </Button>
      </div>
      <TaskForm task={editingTask ?? undefined} onClose={handleCloseForm} />
    </div>
  );
};

export default Sidebar;