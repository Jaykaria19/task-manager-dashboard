import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem } from '@mui/material';
import type { TTask } from '../../types/TTask';
import { TaskContext } from '../../contexts/TaskContext';

const STATUS_OPTIONS = ['Todo', 'In Progress', 'Done'] ;
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'] ;

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  status: Yup.string()
    .oneOf(STATUS_OPTIONS, 'Invalid status')
    .required('Status is required'),
  priority: Yup.string()
    .oneOf(PRIORITY_OPTIONS, 'Invalid priority')
    .required('Priority is required'),
  dueDate: Yup.string().required('Due date is required'),
});

type TTaskFormProps = {
  task?: TTask;
  onClose?: () => void;
  onEditTask?: (task: TTask) => void
};

const TaskForm: React.FC<TTaskFormProps> = ({ task: initialTask, onClose, }) => {
  const taskContext = useContext(TaskContext);

  const handleSubmit = useCallback((values: Omit<TTask, 'id' | 'userEmail'>) => {
      if (initialTask) {
        taskContext?.updateTask(initialTask.id, values);
      } else {
        taskContext?.addTask(values);
      }
      onClose?.();
    }, [initialTask, taskContext, onClose]
  );

  const formik = useFormik({
    initialValues: {
      title: initialTask?.title || '',
      description: initialTask?.description || '',
      status: initialTask?.status || 'Todo',
      priority: initialTask?.priority || 'Low',
      dueDate: initialTask?.dueDate || '',
    },
    validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: false,
    validateOnBlur: true,
  });

  const statusOptions = useMemo(() => STATUS_OPTIONS, []);
  const priorityOptions = useMemo(() => PRIORITY_OPTIONS, []);

  useEffect(() => {
    const handleEditEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.type === 'editTask' && customEvent.detail) {
        formik.setValues({
          title: customEvent.detail.title,
          description: customEvent.detail.description,
          status: customEvent.detail.status,
          priority: customEvent.detail.priority,
          dueDate: customEvent.detail.dueDate,
        });
      }
    };

    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.addEventListener('editTask', handleEditEvent);
      return () => sidebar.removeEventListener('editTask', handleEditEvent);
    }}, [formik]);

  return (
    <form onSubmit={formik.handleSubmit} className="!space-y-4">

      <TextField  fullWidth size="small"  label="Title"
        name="title" value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && !!formik.errors.title}
        helperText={formik.touched.title && formik.errors.title}
        variant="outlined"/>

      <TextField fullWidth size="small" label="Description" name="description"
        multiline rows={3}
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && !!formik.errors.description}
        helperText={formik.touched.description && formik.errors.description}
        variant="outlined"
      />

      <TextField fullWidth
        size="small" select label="Status"
        name="status" value={formik.values.status}
        onChange={formik.handleChange}
        error={formik.touched.status && !!formik.errors.status}
        helperText={formik.touched.status && formik.errors.status}
        variant="outlined" >

        {statusOptions.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </TextField>

      <TextField fullWidth size="small"
        select  label="Priority"  name="priority"
        value={formik.values.priority} onChange={formik.handleChange}
        error={formik.touched.priority && !!formik.errors.priority}
        helperText={formik.touched.priority && formik.errors.priority}
        variant="outlined">
        {priorityOptions.map((priority) => (
          <MenuItem key={priority} value={priority}>
            {priority}
          </MenuItem>
        ))}
      </TextField>

      <TextField  fullWidth size="small" label="Due Date"
        name="dueDate"   type="date"
        value={formik.values.dueDate}  onChange={formik.handleChange}
        error={formik.touched.dueDate && !!formik.errors.dueDate}
        helperText={formik.touched.dueDate && formik.errors.dueDate}
        variant="outlined" />
        
      <div className="flex justify-center items-center gap-x-4">
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {initialTask ? 'Update Task' : 'Add Task'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose} fullWidth>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;