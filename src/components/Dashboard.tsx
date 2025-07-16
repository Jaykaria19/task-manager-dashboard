import { useCallback, useContext, useState } from 'react';
import { TaskProvider } from '../providers/TaskProvider';
import TaskList from './tasks/TaskList';
import TaskModal from './tasks/TaskModal';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import type { TTask } from '../types/TTask';

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TTask | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [dueDate, setDueDate] = useState<string>('');
  const [tempSearchQuery, setTempSearchQuery] = useState('');
  const [tempStatusFilter, setTempStatusFilter] = useState<string>('All');
  const [tempPriorityFilter, setTempPriorityFilter] = useState<string>('All');
  const [tempDueDate, setTempDueDate] = useState<string>('');

  const handleLogout = useCallback(() => {
    authContext?.logout();
    navigate('/login');
  }, [authContext, navigate]);

  const handleCreateTask = useCallback(() => {
    setEditingTask(null);
    setIsModalOpen(true);
  }, []);

  const handleEditTask = useCallback((task: TTask) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  const handleApplyFilters = useCallback(() => {
    setSearchQuery(tempSearchQuery);
    setStatusFilter(tempStatusFilter);
    setPriorityFilter(tempPriorityFilter);
    setDueDate(tempDueDate);
  }, [tempSearchQuery, tempStatusFilter, tempPriorityFilter, tempDueDate]);

  const handleResetFilters = useCallback(() => {
    setTempSearchQuery('');
    setTempStatusFilter('All');
    setTempPriorityFilter('All');
    setTempDueDate('');
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setDueDate('');
  }, []);

  return (
    <TaskProvider>
      <div className="flex flex-col h-screen">
        <div className="p-4 flex justify-between items-center bg-white shadow-md">
          <h1 className="text-2xl font-bold">Task Manager Dashboard</h1>
          <div className='flex justify-center items-center gap-x-5'>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleCreateTask}
            >
              Create Task
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              className="ml-2"
            >
              Logout
            </Button>
          </div>
        </div>
        <div className="p-4 bg-white shadow-md">
          <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
            <TextField
              label="Search Tasks"
              variant="outlined"
              size="small"
              value={tempSearchQuery}
              onChange={(e) => setTempSearchQuery(e.target.value)}
              sx={{ width: 200 }}
            />
            <FormControl variant="outlined" size="small" sx={{ width: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={tempStatusFilter}
                onChange={(e) => setTempStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Todo">Todo</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small" sx={{ width: 150 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={tempPriorityFilter}
                onChange={(e) => setTempPriorityFilter(e.target.value)}
                label="Priority"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
             <FormControl  variant="outlined" size="small" sx={{ width: 250 }}>
            <TextField
              label="Due Date"
              type="date"
              variant="outlined"
              size="small"
              value={tempDueDate}
              InputLabelProps={{ shrink: true }} 
              onChange={(e) => setTempDueDate(e.target.value)}
            />
             </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleApplyFilters}
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleResetFilters}
            >
              Reset
            </Button>
          </Box>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="w-full p-4 overflow-y-auto">
            <TaskList
              onEditTask={handleEditTask}
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              dueDate={dueDate}
            />
          </div>
        </div>
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          task={editingTask}
        />
      </div>
    </TaskProvider>
  );
}