// src/components/AddCourse.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    axios.post('http://localhost:5000/api/courses', { title, description })
      .then(() => {
        setTitle('');
        setDescription('');
        alert('Course added!');
      })
      .catch(error => console.error(error));
  };

  return (
    <Box>
      <TextField
        label="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Course Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleSubmit}>Add Course</Button>
    </Box>
  );
};

export default AddCourse;
