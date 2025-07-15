import { Modal, Box, Typography, Button } from '@mui/material';

type TDeleteConfirmationModalProps = {
  isOpen: boolean;
  taskName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteConfirmationModal: React.FC<TDeleteConfirmationModalProps> = ({isOpen, taskName, onConfirm, onCancel,}) => {
 
    return (
    <Modal open={isOpen} onClose={onCancel} aria-labelledby="delete-confirmation-modal-title"
      aria-describedby="delete-confirmation-modal-description">
      <Box
        sx={{
          position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',
          width: 400,bgcolor: 'background.paper',
          boxShadow: 24,p: 4,borderRadius: 2,}}>
        <Typography id="delete-confirmation-modal-title" variant="h6" component="h2" gutterBottom>
          Delete Confirmation
        </Typography>
        <Typography id="delete-confirmation-modal-description" sx={{ mb: 3 }}>
          Do you want to delete {taskName}?
        </Typography>
        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button variant="contained" color="error" onClick={onConfirm}>
            Yes
          </Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;