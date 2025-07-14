import { useCallback, useContext, useState } from 'react';
import { TaskProvider } from '../providers/TaskProvider';
import TaskList from './tasks/TaskList';
import Sidebar from './tasks/Sidebar';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = useCallback(() => {
    authContext?.logout();
    navigate('/login');
  }, [authContext, navigate]);

  const handleCreateTask = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  return (
    <TaskProvider>
      <div className="flex flex-col h-screen">
        <div className="p-4 flex justify-between items-center bg-white shadow-md">
          <h1 className="text-2xl font-bold">Task Manager Dashboard</h1>
          <div>
            <Button variant="contained"  color="primary"
              startIcon={<AddIcon />} onClick={handleCreateTask}  >
              Create Task
            </Button>

            <Button variant="contained" color="secondary"
              onClick={handleLogout} className="ml-2">
              Logout
            </Button>
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="w-3/4 p-4 overflow-y-auto">
            <TaskList />
          </div>
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
      </div>
    </TaskProvider>
  );
}