import React, { useState } from 'react';
import { Button, Modal, TextField, Box } from '@mui/material';
import axios from 'axios'; // Import Axios

const ModalForm = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // Send a post request to the API endpoint with form data
      const response = await axios.post('user', formData);
      console.log('Response:', response.data);
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <TextField
            label="Email"            
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalForm;
